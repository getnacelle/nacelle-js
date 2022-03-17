import { nacelleClient } from 'services';
import { CONTENT_PAGE_QUERY } from 'queries/contentPage'

const ContentHandle = ({ page }) => {

  const fields = page?.fields || {};
  const { sections, ...rest } = fields
  const content = { fields: rest }

  return (
    <div>
      HEY YOU
    </div>
  )
}

export async function getStaticProps() {
  const { pages } = await nacelleClient.query({
    query: CONTENT_PAGE_QUERY,
    variables: { handle: 'page-homepage' }
  });
  return {
    props: {
      page: pages[0] || null
    }
  };
}

export default ContentHandle