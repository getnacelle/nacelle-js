import { useSearch } from 'hooks/useSearch';
import { ProductProvider } from 'context/Product';
import ProductCard from 'components/Product/ProductCard';

const SearchResults = () => {
  const { results } = useSearch();

  return (
    <div className="pt-12 lg:mt-0 lg:col-span-2 xl:col-span-3">
      {results?.length > 0 && (
        <div
          className="
            grid grid-cols-2
            gap-x-4 gap-y-8
            sm:grid-cols-3 sm:gap-x-6
            lg:grid-cols-4
            xl:gap-x-8
          "
        >
          {results.map((product) => (
            <ProductProvider product={product} key={product.nacelleEntryId}>
              <ProductCard />
            </ProductProvider>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
