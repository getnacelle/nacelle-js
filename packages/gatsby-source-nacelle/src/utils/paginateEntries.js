module.exports = function (client, query, collections) {
  return collections.map(async (collection) => {
    const key = Object.keys(collection.node).find((key) => {
      return collection.node[key]?.edges;
    });
    let edges = collection.node[key].edges;
    let hasNextPage = collection.node[key].pageInfo.hasNextPage;
    let endCursor = collection.node[key].pageInfo.endCursor;

    while (hasNextPage) {
      const response = await client.query({
        query,
        variables: JSON.stringify({
          filter: {
            nacelleEntryIds: [collection.node.nacelleEntryId]
          },
          after: endCursor
        })
      });

      const paginatedCollection = Object.values(response)[0].edges[0];
      edges = edges.concat(paginatedCollection.node[key].edges);
      hasNextPage = paginatedCollection.node[key].pageInfo.hasNextPage;
      endCursor = paginatedCollection.node[key].pageInfo.endCursor;
    }

    collection.node[key] = {
      edges
    };

    return collection.node;
  });
};
