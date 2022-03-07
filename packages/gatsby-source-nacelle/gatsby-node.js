const sourceNodes = require('./src/source-nodes');
const typeDefs = require('./src/type-defs');
const { capitalize } = require('./src/utils');

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    nacelleClient: Joi.required().description(
      'Instance of the `@nacelle/storefront-sdk` which you want to use to fetch your nacelle data'
    ),
    cacheDuration: Joi.number().description(
      'Max duration in ms that gatsby-source-nacelle caches product, collection, and content data from previous builds'
    )
  });
};

exports.sourceNodes = async (gatsbyApi, pluginOptions) => {
  const { nacelleClient } = pluginOptions;

  const client = nacelleClient;

  const [
    spaceData,
    navigationData,
    productData,
    productCollectionData,
    contentData,
    contentCollectionData
  ] = await Promise.all([
    // fetch data from Nacelle's Hail Frequency API
    client.spaceProperties(),
    client.navigation(),
    client.products(),
    client.productCollections(),
    client.content(),
    client.contentCollections()
  ]).catch((err) => {
    throw new Error(`Could not fetch data from Nacelle: ${err.message}`);
  });

  await Promise.all([
    // use Nacelle data to create Gatsby nodes
    sourceNodes({
      gatsbyApi,
      pluginOptions,
      data: spaceData,
      dataType: 'SpaceProperties',
      uniqueIdProperty: null
    }),
    sourceNodes({
      gatsbyApi,
      pluginOptions,
      data: navigationData,
      dataType: 'NavigationGroup',
      uniqueIdProperty: 'groupId'
    }),
    sourceNodes({
      gatsbyApi,
      pluginOptions,
      data: productData,
      dataType: 'Product'
    }),
    sourceNodes({
      gatsbyApi,
      pluginOptions,
      data: productCollectionData,
      dataType: 'ProductCollection'
    }),
    sourceNodes({
      gatsbyApi,
      pluginOptions,
      data: contentData,
      dataType: 'Content'
    }),
    sourceNodes({
      gatsbyApi,
      pluginOptions,
      data: contentCollectionData,
      dataType: 'ContentCollection'
    })
  ]).catch((err) => {
    throw new Error(
      `Could not create Gatsby nodes from Nacelle data: ${err.message}`
    );
  });
};

exports.createSchemaCustomization = async (
  { actions, schema },
  pluginOptions
) => {
  // create custom type definitions to maintain data shape
  // in both preview and production settings
  const { nacelleClient } = pluginOptions;
  // fetch all of the content data & get one of each content types
  const contentData = await nacelleClient.content().then((c) => {
    const touchedTypes = [];
    return c.filter((e) => {
      if (!touchedTypes.includes(e.type)) {
        touchedTypes.push(e.type);
        return true;
      } else {
        return false;
      }
    });
  });
  // define the ContentTypes for the schema
  const contentTypes = contentData.map((content) => {
    return schema.buildObjectType({
      name: `NacelleContentRemote${capitalize(content.type)}`,
      interfaces: ['Node', 'NacelleContent'],
      fields: {
        id: 'ID!',
        collections: '[NacelleContentCollection!]',
        createdAt: 'Int',
        handle: 'String',
        locale: 'String',
        nacelleEntryId: 'ID!',
        published: 'Boolean',
        sourceEntryId: 'ID!',
        title: 'String',
        type: 'String',
        updatedAt: 'Int'
      }
    });
  });
  const mergedTypeDefs = [typeDefs, ...contentTypes];
  actions.createTypes(mergedTypeDefs);
};

exports.createResolvers = async ({ createResolvers, intermediateSchema }) => {
  const resolvers = {
    NacelleProductCollection: {
      products: {
        type: ['NacelleProduct'],
        resolve: async (source, args, context) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                nacelleEntryId: {
                  in: source.products.map((product) => product.nacelleEntryId)
                }
              }
            },
            type: 'NacelleProduct'
          });
          return entries;
        }
      }
    },
    NacelleProduct: {
      collections: {
        type: ['NacelleProductCollection'],
        resolve: async (source, args, context) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                products: {
                  elemMatch: { nacelleEntryId: { eq: source.nacelleEntryId } }
                }
              }
            },
            type: 'NacelleProductCollection'
          });
          return entries;
        }
      }
    },
    NacelleContentCollection: {
      entries: {
        type: ['NacelleContent'],
        resolve: async (source, args, context) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                nacelleEntryId: {
                  in: source.entries.map((entry) => entry.nacelleEntryId)
                }
              }
            },
            type: 'NacelleContent'
          });
          return entries;
        }
      }
    }
  };
  // get all of the types that implement the NacelleContent Interface so we can create resolvers for it
  const nacelleContentImplementors =
    intermediateSchema._implementationsMap.NacelleContent.objects;
  nacelleContentImplementors.forEach((contentType) => {
    resolvers[contentType] = {
      collections: {
        type: ['NacelleContentCollection!'],
        resolve: async (source, args, context) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                entries: {
                  elemMatch: { nacelleEntryId: { eq: source.nacelleEntryId } }
                }
              }
            },
            type: 'NacelleContentCollection'
          });
          return entries;
        }
      }
    };
  });
  createResolvers(resolvers);
};

exports.onPostBootstrap = async function ({ cache }) {
  cache.set('nacelle-timestamp', Date.now());
};
