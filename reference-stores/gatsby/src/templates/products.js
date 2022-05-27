import React from 'react';
import { ProductProvider } from 'context/Product';
import ProductDetails from 'components/Product/ProductDetails';

const Product = ({ pageContext }) => {
  const { product, page } = pageContext;
  const fields = page?.remoteFields || {};
  const { sections, ...rest } = fields;
  const content = { fields: rest };

  return (
    product && (
      <div className="bg-white">
        <ProductProvider product={product}>
          <ProductDetails content={content} />
        </ProductProvider>
      </div>
    )
  );
};

export default Product;
