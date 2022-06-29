const {
  cacheIsInvalid,
  capitalize,
  createRemoteImageFileNode,
  hasBeenIndexedSinceLastBuild,
  replaceKey,
  findNestedImages,
  linkNestedContentReferences
} = require('../utils');

/**
 * Creates Gatsby nodes from Nacelle data
 * @param {Object} config - configuration object
 * @param {Object} config.gatsbyApi - object containing the `gatsbyApi` param from exports.sourceNodes
 * @param {Object} config.pluginOptions - object containing the `pluginOptions` param from exports.sourceNodes
 * @param {Object} config.data - the Nacelle data from which a Gatsby node will be created
 * @param {Object[]} keyMappings - an array of key mappings
 * @param {string} keyMappings[].oldKey - the property to be replaced
 * @param {string} keyMappings[].newKey - the property to replace with
 * @param {string} uniqueIdProperty - the unique property of the data used to create a node ID
 */
module.exports = async function ({
  gatsbyApi,
  pluginOptions,
  data,
  dataType,
  keyMappings = [{ oldKey: 'fields', newKey: 'remoteFields' }],
  uniqueIdProperty = 'nacelleEntryId'
}) {
  const { actions, createContentDigest, cache, getNode } = gatsbyApi;
  const { createNode, touchNode } = actions;

  // detect if users have opted into gatsby image
  let useGatsbyImage = false;
  try {
    // the user can opt into using Gatsby Image by installing `gatsby-source-filesystem`
    require('gatsby-source-filesystem');
    useGatsbyImage = true;
  } catch (err) {
    // do nothing because useGatsbyImage is already false
  }

  try {
    console.info(`[gatsby-source-nacelle] fetching ${dataType}`);

    // handle incremental builds
    const lastFetched = await cache.get('nacelle-timestamp');

    let newNodeCount = 0;

    // format data for Gatsby by changing the names of reserved properties
    const formattedData = Array.isArray(data)
      ? data.map((entry) => replaceKey(entry, keyMappings))
      : replaceKey(data, keyMappings);

    if (Array.isArray(formattedData)) {
      await Promise.all(
        formattedData.map(async (entry) => {
          if (
            hasBeenIndexedSinceLastBuild(entry, lastFetched) ||
            cacheIsInvalid(lastFetched, pluginOptions)
          ) {
            // for content entries, need to add the content type
            // so that we can extend/infer types to to the nodes
            let nodeType = `Nacelle${dataType}`;
            if (dataType === 'Content') {
              nodeType = `NacelleContentRemote${capitalize(entry.type)}`;
            }
            const nodeMeta = {
              id: `Nacelle${dataType}-${entry[uniqueIdProperty]}`,
              parent: null,
              children: [],
              internal: {
                type: nodeType,
                contentDigest: createContentDigest(entry)
              }
            };

            const node = Object.assign({}, entry, nodeMeta);
            if (useGatsbyImage) {
              await fetchRemoteImageNodes(dataType, node, gatsbyApi);
              // if it's a content node, get the images on the remoteFields
              if (dataType === 'Content') {
                let images = findNestedImages(node.remoteFields, [
                  'remoteFields'
                ])?.filter((val) => val);
                await linkNestedContentReferences(node.remoteFields, node);
                // create remote image file nodes for each field
                await Promise.all(
                  fetchRemoteImageNodesForContent(node, images, gatsbyApi)
                );
              } else if (dataType === 'Product' && node.content?.remoteFields) {
                // get any images in product content that aren't in media/featuredMedia
                const productContentImages = findNestedImages(
                  node.content.remoteFields,
                  ['content', 'remoteFields']
                )?.filter((val) => val);
                const variantContentImages = node.variants
                  ?.map((variant, index) => {
                    if (!variant.content) {
                      return;
                    }
                    return findNestedImages(variant.content.remoteFields, [
                      'variants',
                      index,
                      'content',
                      'remoteFields'
                    ])?.filter((val) => val);
                  })
                  .flat();
                await Promise.all([
                  ...fetchRemoteImageNodesForContent(
                    node,
                    productContentImages,
                    gatsbyApi
                  ),
                  ...fetchRemoteImageNodesForContent(
                    node,
                    variantContentImages,
                    gatsbyApi
                  )
                ]);
              } else if (dataType === 'ProductCollection') {
                // else get any images from product collections that aren't remote fields
                const collectionContentImages = findNestedImages(
                  node?.content?.remoteFields,
                  ['content', 'remoteFields']
                )?.filter((val) => val);
                await Promise.all(
                  fetchRemoteImageNodesForContent(
                    node,
                    collectionContentImages,
                    gatsbyApi
                  )
                );
              } else if (dataType === 'ContentCollection') {
                const collectionContentImages = findNestedImages(
                  node?.content?.remoteFields,
                  ['content', 'remoteFields']
                )?.filter((val) => val);
                await Promise.all(
                  fetchRemoteImageNodesForContent(
                    node,
                    collectionContentImages,
                    gatsbyApi
                  )
                );
              }
            }
            createNode(node);

            newNodeCount += 1;
          } else {
            touchNode(getNode(`Nacelle${dataType}-${entry[uniqueIdProperty]}`));
          }
        })
      );
    } else if (Object.keys(formattedData).length) {
      // don't make an effort to cache single entries, such as Nacelle Space data
      const nodeMeta = {
        id: `Nacelle${dataType}`,
        parent: null,
        children: [],
        internal: {
          type: `Nacelle${dataType}`,
          contentDigest: createContentDigest(formattedData)
        }
      };

      const node = Object.assign({}, formattedData, nodeMeta);
      if (useGatsbyImage) {
        await fetchRemoteImageNodes(dataType, node, gatsbyApi);
      }
      createNode(node);
    }

    if (Array.isArray(formattedData)) {
      if (newNodeCount) {
        console.info(
          `[gatsby-source-nacelle] created ${newNodeCount} new ${dataType} nodes`
        );
      } else if (!formattedData.length) {
        console.info(
          `[gatsby-source-nacelle] no ${dataType} data present, skipping node creation`
        );
      } else {
        console.info(
          `[gatsby-source-nacelle] using cached ${dataType} nodes from previous build`
        );
      }
    }
  } catch (err) {
    throw new Error(
      `Problem sourcing Nacelle ${dataType} nodes: ${err.message}`
    );
  }
};

/**
 * helper for fetching images based on the content type.
 * @param {string} dataType - kind of node data
 * @param {Object} node - the new node to be created
 * @param {Object} gatsbyApi - Functions provided by `Gatsby for managing nodes`
 * @param {Object} gatsbyApi.actions
 * @param {function} gatsbyApi.getCache
 * @param {function} gatsbyApi.createNodeId
 */
async function fetchRemoteImageNodes(dataType, node, gatsbyApi) {
  const isImage = (nodeMediaEntry) =>
    nodeMediaEntry &&
    nodeMediaEntry.type &&
    nodeMediaEntry.type.toLowerCase().startsWith('image');
  if (
    dataType === 'Product' ||
    dataType === 'ProductCollection' ||
    dataType === 'ContentCollection'
  ) {
    await createRemoteImageFileNode(
      node,
      [
        ['content', 'featuredMedia'],
        ['content', 'media']
      ],
      gatsbyApi,
      { isImage }
    );
  }
}

function fetchRemoteImageNodesForContent(node, images, gatsbyApi) {
  if (!images) {
    return [];
  }

  return images.map((image) => {
    // get the key for the image address & remove it from the path so it can be used in createRemoteImageFileNode as the imageProperty
    const imageKey = image.path.pop();
    return createRemoteImageFileNode(node, [image.path], gatsbyApi, {
      isImage: () => true,
      imageProperties: [imageKey],
      newField: 'remoteImage___NODE'
    });
  });
}
