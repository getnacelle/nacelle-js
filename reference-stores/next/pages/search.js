import { nacelleClient } from 'services';
import { useRouter } from 'next/router'
import { SEARCH_PAGE_QUERY } from 'queries/searchPage';
import { SearchProvider } from 'context/Search'
import SearchForm from 'components/Search/SearchForm'

const Search = ({ products }) => {
  const router = useRouter()

  return (
    <SearchProvider catalog={products} query={router.query.q}>
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