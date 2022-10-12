import React from 'react';
import { Link } from 'gatsby';
import { ProductProvider } from 'context/Product';
import ProductCard from 'components/Product/ProductCard';

const CollectionGrid = ({ collection }) => {
  return (
    collection && (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 pb-10 flex">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 flex-1">
              {collection.content.title}
            </h1>
          </div>
          {collection.products && (
            <div className="pt-12 text-center">
              <div
                className="
                grid grid-cols-2
                gap-x-4 gap-y-8
                sm:grid-cols-3 sm:gap-x-6
                lg:grid-cols-4
                xl:gap-x-8
                text-left
              "
              >
                {collection.products.map((product) => (
                  <ProductProvider
                    product={product}
                    key={product.nacelleEntryId}
                  >
                    <ProductCard />
                  </ProductProvider>
                ))}
              </div>
              {collection.numPages > 1 && (
                <div className="mt-14 flex flex-wrap justify-center gap-4">
                  {Array.from({ length: collection.numPages }).map((_, i) => {
                    const basePath = `/collections/${collection.content.handle}`;
                    const path = i === 0 ? basePath : `${basePath}/${i + 1}`;
                    return (
                      <Link
                        to={path}
                        className="
                          w-8 h-8 
                          rounded-full 
                          border-2 border-indigo-600 
                          flex items-center justify-center 
                          text-sm font-medium text-indigo-600
                          hover:bg-indigo-600 hover:text-white
                        "
                        activeClassName="
                          bg-indigo-600 
                          text-white 
                          pointer-events-none
                          opacity-50
                        "
                      >
                        {i + 1}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default CollectionGrid;
