import { nacelleClient } from 'services';
import { CONTENT_PAGE_QUERY } from 'queries/contentPage';
import { resolvePageData } from 'utils/resolvers';
import Section from 'components/Section/Section';

const Home = ({ page }) => {
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

export async function getStaticProps() {
  const { pages } = await nacelleClient.query({
    query: CONTENT_PAGE_QUERY,
    variables: { handle: 'page-homepage' }
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

export default Home;
