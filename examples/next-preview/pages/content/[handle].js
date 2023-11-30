import { nacelleClient } from 'services';
import styles from '../../styles/Content.module.css';

function Content({ content, preview, path }) {
  return (
    content && (
      <div className={styles.content}>
        <div>
          <h2>Is preview on: {preview ? 'true' : 'false'}</h2>
          {preview ? (
            <span>
              <a href={`/api/exit-preview?redirect=${path}`}>Exit preview</a>
              <p>Link path: {`/api/exit-preview?redirect=${path}`}</p>
            </span>
          ) : (
            <span>
              <a href={`/api/preview?redirect=${path}`}>Activate preview</a>
              <p>Link path: {`/api/preview?redirect=${path}`}</p>
            </span>
          )}
        </div>
        <h1>{content.title}</h1>
        <h2>Content data:</h2>
        <pre>{JSON.stringify(content, null, 2)}</pre>
      </div>
    )
  );
}

export default Content;

export async function getStaticPaths() {
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
  // Checks for the preview and previewData objects in the NextJS context
  // Re-configures the client with the preview token
  if (preview && previewData?.previewToken) {
    nacelleClient.setConfig({
      previewToken: previewData.previewToken
    });
  }

  const contents = await nacelleClient.content({ handles: [params.handle] });

  if (!contents.length) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      content: contents.at(0),
      preview: preview || false,
      path: `/content/${params.handle}`
    }
  };
}

const HANDLES_QUERY = /* GraphQL */ `
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
