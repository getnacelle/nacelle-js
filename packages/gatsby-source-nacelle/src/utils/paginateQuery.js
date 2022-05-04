module.exports = async function (client, query, data) {
  let edges = data.edges;
  let hasNextPage = data.pageInfo.hasNextPage;
  let endCursor = data.pageInfo.endCursor;

  while (hasNextPage) {
    const response = await client.query({
      query,
      variables: JSON.stringify({
        filter: {
          after: endCursor
        }
      })
    });
    const responseData = Object.values(response)[0];
    hasNextPage = responseData.pageInfo.hasNextPage;
    endCursor = responseData.pageInfo.endCursor;
    edges = edges.concat(responseData.edges);
  }

  return edges;
};
