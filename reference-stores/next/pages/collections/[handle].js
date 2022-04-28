import { nacelleClient } from 'services';
import {
  COLLECTION_ROUTES_QUERY,
  COLLECTION_PAGE_QUERY
} from 'queries/collectionPage';
import CollectionGrid from 'components/Collection/CollectionGrid';

const CollectionHandle = ({ collection, page }) => {
  const fields = page?.fields || {};
  const { sections, ...rest } = fields;

  return (
    collection && (
      <div className="bg-white">
        <CollectionGrid collection={collection} />
      </div>
    )
  );
};

export async function getStaticPaths() {
  const { collections } = await nacelleClient.query({
    query: COLLECTION_ROUTES_QUERY
  });

  const paths = collections
    .filter((collection) => collection.content?.handle)
    .map((collection) => ({ params: { handle: collection.content.handle } }));

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
    page: pages[0]
  });
  return {
    props: {
      collection: collections[0] || null,
      page: page || null
    }
  };
}

export default CollectionHandle;
