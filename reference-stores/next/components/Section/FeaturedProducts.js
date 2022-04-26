import Link from 'next/link';

const FeaturedProducts = ({ content }) => {
  return (
    content && (
      <section className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-baseline sm:justify-between">
            {content.fields.heading && (
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                {content.fields.heading}
              </h2>
            )}
            {content.fields.linkUrl && (
              <Link href={content.fields.linkUrl}>
                <a className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
                  {content.fields.linkText}
                  <span aria-hidden="true"> &rarr;</span>
                </a>
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
            {/* {activeProducts.map((product) => (
              <ProductProvider product={product} key={product.nacelleEntryId}>
                <ProductCard />
              </ProductProvider>
            ))} */}
          </div>
          <div className="mt-6 sm:hidden">
            {content.fields.linkUrl && (
              <Link href={content.fields.linkUrl}>
                <a className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                  {content.fields.linkText}
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </Link>
            )}
          </div>
        </div>
      </section>
    )
  );
};

export default FeaturedProducts;
