import { nacelleClient, nacellePreviewClient } from 'services';

function Content({ content }) {
  return (
    content && (<pre>{JSON.stringify(content, null, 2)}</pre>)
  )
}

export default Content;

export async function getStaticPaths() {
  // Performs a GraphQL query to Nacelle to get product handles.
  // (https://nacelle.com/docs/querying-data/storefront-sdk)
  const results = await nacelleClient.query({
    query: HANDLES_QUERY
  });
  const handles = results.allContent.edges
    .filter((node) => node?.handle)
    .map((node) => ({ params: { handle: node.handle } }));

  return {
    paths: handles,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params, preview }) {
  // Performs a GraphQL query to Nacelle to get product data,
  // using the handle of the current page.
  // (https://nacelle.com/docs/querying-data/storefront-sdk)

  console.log({ handles: [ params.handle ] })
  const contents = preview 
    ? await nacellePreviewClient.content({handles: [params.handle]}) 
    : await nacelleClient.content({handles: [params.handle]}) 

  console.log(contents)
  if (!contents.length) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      content: contents[0]
    }
  };
}

// GraphQL query for the handles of products. Used in `getStaticPaths`.
// (https://nacelle.com/docs/querying-data/storefront-api)
const HANDLES_QUERY = `
  {
    allContent {
      edges {
        node {
          handle
        }
      }
    }
  }
`;