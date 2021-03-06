import { nacelleClient } from 'services';
import { CONTENT_ROUTES_QUERY, CONTENT_PAGE_QUERY } from 'queries/contentPage';
import { resolvePageData } from 'utils/resolvers';
import Section from 'components/Section/Section';

const ContentHandle = ({ page }) => {
  const fields = page?.fields || {};
  const { sections } = fields;

  return (
    page && (
      <div className="bg-white">
        {sections?.map((section, index) => (
          <Section key={index} content={section} />
        ))}
      </div>
    )
  );
};

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

export async function getStaticProps({ params }) {
  const { pages } = await nacelleClient.query({
    query: CONTENT_PAGE_QUERY,
    variables: { handle: `page-${params.handle}` }
  });
  const { page } = await resolvePageData({
    client: nacelleClient,
    page: pages[0]
  });
  return {
    props: {
      page: page || null
    }
  };
}

export default ContentHandle;
