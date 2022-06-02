const path = require('path');
const ProductsQuery = require('./src/queries/pages/products');
const CollectionsQuery = require('./src/queries/pages/collections');
// const ContentQuery = require('./src/queries/pages/content');
// const SearchQuery = require('./src/queries/pages/search');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const productPages = await ProductsQuery({ graphql });
  productPages.forEach((productPage) => {
    createPage({
      path: `/products/${productPage.product.content.handle}`,
      component: path.resolve('./src/templates/products.js'),
      context: productPage
    });
  });

  const collectionPages = await CollectionsQuery({ graphql });
  collectionPages.forEach((collectionPage) => {
    const handle = collectionPage?.collection?.content?.handle;
    const products = collectionPage?.collection?.products;
    if (handle && products.length) {
      const productsPerPage = 12;
      const numPages = Math.ceil(products.length / productsPerPage);
      Array.from({ length: numPages }).forEach((_, i) => {
        const paginatedProducts = products.slice(
          i * productsPerPage,
          (i + 1) * productsPerPage
        );
        createPage({
          path:
            i === 0
              ? `/collections/${handle}`
              : `/collections/${handle}/${i + 1}`,
          component: path.resolve('./src/templates/collections.js'),
          context: {
            collection: {
              ...collectionPage.collection,
              products: paginatedProducts,
              numPages: numPages
            }
          }
        });
      });
    }
  });

  // const contentPages = await ContentQuery({ graphql });
  // contentPages.forEach((contentPage) => {
  //   let handle = contentPage?.page?.remoteFields?.handle?.split('page-')?.pop();
  //   handle = handle && handle === 'homepage' ? '/' : `/pages/${handle}`;
  //   if (handle) {
  //     createPage({
  //       path: handle,
  //       component: path.resolve('./src/templates/content.js'),
  //       context: contentPage
  //     });
  //   }
  // });

  // const searchPage = await SearchQuery({ graphql });
  // createPage({
  //   path: '/search',
  //   component: path.resolve('./src/templates/search.js'),
  //   context: searchPage
  // });
};
