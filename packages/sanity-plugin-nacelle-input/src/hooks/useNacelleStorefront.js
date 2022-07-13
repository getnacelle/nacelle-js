import { useState, useEffect } from 'react'

import useSWR from 'swr'
import fetch from 'isomorphic-unfetch'
/* eslint-disable-next-line import/no-unresolved */
import config from 'config:@nacelle/sanity-plugin-nacelle-input'

function fetchFromNacelleStorefront({
  query,
  first,
  spaceToken,
  endpoint,
  searchTerm
}) {
  const variables = searchTerm
    ? {
        first,
        searchFilter: {
          fields: ['HANDLE', 'TITLE'],
          term: searchTerm
        }
      }
    : {
        first
      }

  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-nacelle-space-token': spaceToken
    },
    body: JSON.stringify({
      query,
      variables
    })
  }).then((res) => res.json())
}

async function fetcher(query, spaceToken, endpoint, type, searchTerm) {
  let data = []

  const res = await fetchFromNacelleStorefront({
    query,
    first: 200,
    spaceToken,
    endpoint,
    searchTerm
  })

  const queryResultData =
    res?.data?.[
      type === 'products' ? 'allProducts' : 'allProductCollections'
    ]
  const queryResultNodes = queryResultData?.edges.map((edge) => edge.node)
  if (queryResultNodes?.length) {
    data.push(...queryResultNodes)
  }
  return data ?? []
}

/**
 * Fetch data from Nacelle's Hail Frequency API using non-batched queries
 * @param {Object} params - Parameters used to construct the request
 * @param {string} params.query - A single, non-batched query (do not combine, for example, `getProducts` and `getCollections` - these should be two separate queries)
 * @param {function(Object[]):Object[]} params.dataHandler - params.dataHandler - Data handler function that can be used to transform data returned from Nacelle's indices
 * @returns {Object[]} The data stored in Nacelle's indices
 */
export const useNacelleStorefront = ({
  query,
  options,
  type,
  searchTerm,
  dataHandler = (data) => data
}) => {
  let spaceToken =
    options?.nacelleSpaceToken ??
    config.nacelleSpaceToken ??
    process.env.SANITY_STUDIO_NACELLE_SPACE_TOKEN
  const endpoint =
    options?.nacelleEndpoint ??
    config.nacelleEndpoint ??
    process.env.SANITY_STUDIO_NACELLE_ENDPOINT

  const { data, error } = useSWR(
    [query, spaceToken, endpoint, type, searchTerm],
    fetcher
  )
  const [nacelleData, setNacelleData] = useState([])

  useEffect(() => {
    if (error) {
      throw new Error(error)
    }
    if (data) {
      setNacelleData(dataHandler(data))
    }
  }, [data, dataHandler, error, spaceToken])

  return nacelleData
}
