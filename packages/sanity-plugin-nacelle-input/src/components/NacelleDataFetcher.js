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

  if (isLoading) {
    return <Loading />
  }

  return <Gallery data={data} active={active} />
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
