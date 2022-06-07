const { PRODUCT_QUERY } = require('../products/product');

const CollectionsQuery = async ({ graphql }) => {
  const {
    data: { collections }
  } = await graphql(`
    {
      collections: allNacelleProductCollection {
        totalCount
        edges {
          node {
            content {
              handle
              title
            }
            products {
              ${PRODUCT_QUERY}
            }
          }
        }
      }
    }
  `);

  const collectionNodes = collections.edges.map(({ node }) => ({
    totalCount: collections.totalCount,
    ...node
  }));

  const data = collectionNodes?.map((collection) => ({
    collection: collection,
    page: null
  }));

  return [...data];
};

module.exports = CollectionsQuery;
