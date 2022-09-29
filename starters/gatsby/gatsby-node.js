const path = require('path');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  // Product Loading Pages (PLPs) for each ProductCollection
  const collections = await graphql(`
    {
      allNacelleProductCollection {
        edges {
          node {
            content {
              handle
            }
            products {
              content {
                handle
              }
            }
          }
        }
      }
    }
  `);
  collections.data.allNacelleProductCollection.edges.forEach(
    ({ node: collection }) => {
      // Build Product Loading Pages (PLPs) for each collection
      const handle = collection.content?.handle;
      if (!handle) return;
      const products = collection.products;

      if (products.length) {
        const productsPerPage = 12;
        const numPages = Math.ceil(products.length / productsPerPage);
        Array.from({ length: numPages }).forEach((_, i) => {
          const paginatedProducts = products.slice(
            i * productsPerPage,
            (i + 1) * productsPerPage
          );
          const productHandles = paginatedProducts.map(
            (product) => product.content.handle
          );

          createPage({
            path:
              i === 0
                ? `/collections/${handle}`
                : `/collections/${handle}/${i + 1}`,
            component: path.resolve('./src/templates/ProductCollection.js'),
            context: {
              productCollectionHandle: handle,
              productHandles,
              numPages,
              currentPage: i + 1
            }
          });
        });
      }
    }
  );
};
