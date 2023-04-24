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
  const { data } = await nacelleClient.query({
    query: CONTENT_ROUTES_QUERY
  });

  const paths = data.pages.edges
    .filter((page) => page.node.handle)
    .filter((page) => page.node.handle !== 'page-homepage')
    .map((page) => ({ params: { handle: page.node.handle } }));

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const { data } = await nacelleClient.query({
    query: CONTENT_PAGE_QUERY,
    variables: { handle: `page-${params.handle}` }
  });
  const { page } = await resolvePageData({
    client: nacelleClient,
    page: data.pages.edges.at(0)?.node
  });
  return {
    props: {
      page: page || null
    }
  };
}

export default ContentHandle;
