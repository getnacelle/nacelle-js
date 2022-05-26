const path = require('path');
const ProductsQuery = require('./src/queries/pages/products');

exports.createPages = async ({ graphql }) => {
  const data = await ProductsQuery({ graphql });

  // map, get associated content, resolve references
  // createResolvers for cart crosssells???
};
