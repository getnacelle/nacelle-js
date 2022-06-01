const path = require('path');
const ProductsQuery = require('./src/queries/pages/products');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const productPages = await ProductsQuery({ graphql });
  productPages.forEach((productPage) => {
    createPage({
      path: `/products/${productPage.product.content.handle}`,
      component: path.resolve('./src/templates/products.js'),
      context: productPage
    });
  });

  // map, get associated content, resolve references
  // createResolvers for cart crosssells???
};
