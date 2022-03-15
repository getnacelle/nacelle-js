import { Fragment } from 'react'
import { nacelleClient } from 'services';
import { COLLECTION_ROUTES_QUERY, COLLECTION_PAGE_QUERY } from 'queries/collectionPage'

const CollectionHandle = ({ collection, page }) => {

  const fields = page?.fields || {};
  const { sections, ...rest } = fields
  const content = { fields: rest }

  return (
    <Fragment>
      <div>{collection.content.title}</div>
    </Fragment>
  )
}

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
    variables: { handle }
  });
  return {
    props: {
      collection: collections[0] || null,
      page: pages[0] || null
    }
  };
}

export default CollectionHandle