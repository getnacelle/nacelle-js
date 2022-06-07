const { SECTIONS_QUERY } = require('../sections');

const ContentQuery = async ({ graphql }) => {
  const {
    data: { pages }
  } = await graphql(`
    {
      pages: allNacelleContentRemotePageSections {
        edges {
          node {
            remoteFields {
              handle
              sections {
                ${SECTIONS_QUERY}
              }
            }
          }
        }
      }
    }
  `);

  let pageNodes = pages.edges.map(({ node }) => node);

  const data = pageNodes?.map((page) => ({
    page: page
  }));

  return [...data];
};

module.exports = ContentQuery;
