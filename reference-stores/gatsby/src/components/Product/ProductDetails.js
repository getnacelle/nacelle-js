import React from 'react';
import ProductGallery from './ProductGallery';
import ProductForm from './ProductForm';

const ProductDetails = ({ content }) => {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          <ProductGallery />
          <ProductForm content={content} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
