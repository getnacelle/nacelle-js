import { nacelleClient } from 'services';
import { SEARCH_PAGE_QUERY } from 'queries/searchPage';
import { SearchProvider } from 'context/Search'
import SearchForm from 'components/Search/SearchForm'

const Search = ({ products }) => {
  return (
    <SearchProvider catalog={products}>
      <SearchForm />
    </SearchProvider>
  )
}

export async function getStaticProps() {
  const { products } = await nacelleClient.query({
    query: SEARCH_PAGE_QUERY
  });
  return {
    props: {
      products
    }
  };
}

export default Search;