import { nacelleClient } from 'services';
import { SEARCH_PAGE_QUERY } from 'queries/searchPage';
import { SearchProvider } from 'context/Search';
import SearchForm from 'components/Search/SearchForm';

const Search = ({ products }) => {
  return (
    products && (
      <div className="bg-white">
        <SearchProvider catalog={products}>
          <SearchForm />
        </SearchProvider>
      </div>
    )
  );
};

export async function getStaticProps() {
  const { data } = await nacelleClient.query({
    query: SEARCH_PAGE_QUERY
  });
  return {
    props: {
      products: data.products.edges.map((product) => product.node)
    }
  };
}

export default Search;
