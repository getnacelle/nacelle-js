const { SECTIONS_QUERY_FRAGMENT } = require('../fragments/sections');
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
                type
                remoteFields {
                  ${SECTIONS_QUERY_FRAGMENT}
                }
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
