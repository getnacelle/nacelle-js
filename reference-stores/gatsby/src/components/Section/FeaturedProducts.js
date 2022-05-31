import React from 'react';
import { Link } from 'gatsby';
import { ProductProvider } from 'context/Product';
import ProductCard from 'components/Product/ProductCard';

const FeaturedProducts = ({ content }) => {
  console.log('content', content.remoteFields);
  return (
    content && (
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-baseline sm:justify-between">
            {content.remoteFields.heading && (
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                {content.remoteFields.heading}
              </h2>
            )}
            {content.remoteFields.linkUrl && (
              <Link
                to={content.remoteFields.linkUrl}
                className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
              >
                {content.remoteFields.linkText}
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            )}
          </div>
          <div
            className="
              mt-6
              grid grid-cols-1
              gap-y-10
              sm:grid-cols-2
              gap-x-6
              lg:grid-cols-4
              xl:grid-cols-4 xl:gap-x-8
            "
          >
            {content.remoteFields.products.map((product) => (
              <ProductProvider product={product} key={product.nacelleEntryId}>
                <ProductCard />
              </ProductProvider>
            ))}
          </div>
          <div className="mt-6 sm:hidden">
            {content.remoteFields.linkUrl && (
              <Link
                to={content.remoteFields.linkUrl}
                className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
              >
                {content.remoteFields.linkText}
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            )}
          </div>
        </div>
      </section>
    )
  );
};

export default FeaturedProducts;
