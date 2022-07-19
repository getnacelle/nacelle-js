import { nacelleClient } from 'services';

function Content({ content, preview }) {
  return (
    content && (
      <div>
        <h2>Preview: {preview ? 'True' : 'False'}</h2>
        <pre>{JSON.stringify(content, null, 2)}</pre>
      </div>
    )
  );
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

export async function getStaticProps({ params, preview, previewData }) {
  // Performs a GraphQL query to Nacelle to get product data,
  // using the handle of the current page.
  // (https://nacelle.com/docs/querying-data/storefront-sdk)
  console.log('PREVIEW', preview, previewData);

  if (preview && previewData?.previewToken) {
    nacelleClient.setConfig({
      previewToken: previewData?.previewToken
    });
  }

  const contents = await nacelleClient.content({ handles: [params.handle] });

  console.log(contents);
  console.log(await nacelleClient.getConfig());
  if (!contents.length) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      content: contents[0],
      preview: preview || false
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
