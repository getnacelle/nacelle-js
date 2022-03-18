import { nacelleClient } from 'services';
import { CONTENT_ROUTES_QUERY, CONTENT_PAGE_QUERY } from 'queries/contentPage'

const ContentHandle = ({ page }) => {

  const fields = page?.fields || {};
  const { sections, ...rest } = fields
  const content = { fields: rest }

  return (
    <div className="bg-white">
      HEY YOU
    </div>
  )
}

export async function getStaticPaths() {
  const { pages } = await nacelleClient.query({
    query: CONTENT_ROUTES_QUERY
  });

  const paths = pages
    .filter((page) => page.handle)
    .filter((page) => page.handle !== 'page-homepage')
    .map((page) => ({ params: { handle: page.handle } }));

  return {
    paths,
    fallback: 'blocking'
  };

}

export async function getStaticProps({ params: { handle } }) {
  const { pages } = await nacelleClient.query({
    query: CONTENT_PAGE_QUERY,
    variables: { handle }
  });
  return {
    props: {
      page: pages[0] || null
    }
  };
}

export default ContentHandle