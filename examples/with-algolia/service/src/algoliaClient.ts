import algoliasearch from 'algoliasearch'
export const algoliaClient = algoliasearch(
  process.env.ALGOLIA_INDEX as any,
  process.env.ALGOLIA_API_KEY as any
)
