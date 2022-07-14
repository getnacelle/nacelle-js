import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useNacelleStorefront } from '../hooks'
import Gallery from './Gallery'
import Loading from './Loading'

const NacelleResults = ({
  query,
  options,
  dataHandler,
  first,
  after,
  active,
  type,
  searchTerm
}) => {
  const [isLoading, setIsLoading] = useState(true)

  const data = useNacelleStorefront({
    query,
    options,
    dataHandler,
    first,
    after,
    type,
    searchTerm
  })

  useEffect(() => {
    if (data) {
      setIsLoading(false)
    }
  }, [data, setIsLoading])

  const filterOption = (query, option) => {
    const queryText = query.toLowerCase().trim()
    const titleMatch = option.content.title.toLowerCase().includes(queryText)
    const handleMatch = option.content.handle
      .replace('/-/g', '')
      .includes(queryText)
    const tagsMatch =
      Array.isArray(option.tags) &&
      option.tags.find((tag) => tag.toLowerCase().includes(queryText))
    const variantsMatch =
      Array.isArray(option.variants) &&
      option.variants.find((variant) => {
        const titleMatch = variant.content.title
          .toLowerCase()
          .includes(queryText)
        const skuMatch =
          variant.sku &&
          variant.sku.toLowerCase().replace('/-/g', '').includes(queryText)
        return titleMatch || skuMatch
      })
    return titleMatch || handleMatch || tagsMatch || variantsMatch
  }

  const filteredData =
    data &&
    data.filter((searchOption) => filterOption(searchTerm, searchOption))

  if (isLoading) {
    return <Loading />
  }

  return <Gallery data={filteredData} active={active} />
}

NacelleResults.propTypes = {
  query: PropTypes.string.isRequired,
  options: PropTypes.object,
  dataHandler: PropTypes.func,
  first: PropTypes.number,
  after: PropTypes.string,
  active: PropTypes.bool,
  type: PropTypes.oneOf(['products', 'productCollections']).isRequired,
  searchTerm: PropTypes.string
}

export default NacelleResults
