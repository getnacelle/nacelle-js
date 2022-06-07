const { SECTIONS_QUERY } = require('../sections');
const { resolvePageData } = require('../../utils/resolvers/resolvePageData');

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
  pageNodes = await Promise.all(
    pageNodes.map((pageNode) => {
      return resolvePageData({
        graphql,
        page: pageNode
      });
    })
  );

  let data = pageNodes?.map((page) => ({
    page: page
  }));

  data = [...data];
  return data;
};

module.exports = ContentQuery;
