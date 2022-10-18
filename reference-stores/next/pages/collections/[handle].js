import { nacelleClient } from 'services';
import {
  COLLECTION_ROUTES_QUERY,
  COLLECTION_PAGE_QUERY
} from 'queries/collectionPage';
import { resolvePageData } from 'utils/resolvers';
import CollectionGrid from 'components/Collection/CollectionGrid';
import Section from 'components/Section/Section';

const CollectionHandle = ({ collection, page }) => {
  const fields = page?.fields || {};
  const { sections } = fields;

  return (
    collection && (
      <div className="bg-white">
        <CollectionGrid collection={collection} />
        {sections?.map((section, index) => (
          <Section key={index} content={section} />
        ))}
      </div>
    )
  );
};

export async function getStaticPaths() {
  const { collections } = await nacelleClient.query({
    query: COLLECTION_ROUTES_QUERY
  });

  const paths = collections.edges
    .filter((collection) => collection.node.content?.handle)
    .map((collection) => ({
      params: { handle: collection.node.content.handle }
    }));

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params: { handle } }) {
  const { collections, pages } = await nacelleClient.query({
    query: COLLECTION_PAGE_QUERY,
    variables: {
      handle: handle,
      pageHandle: `page-${handle}`
    }
  });
  const { page } = await resolvePageData({
    client: nacelleClient,
    page: pages.edges[0]?.node
  });
  return {
    props: {
      collection: collections.edges[0].node || null,
      page: page || null
    }
  };
}

export default CollectionHandle;
