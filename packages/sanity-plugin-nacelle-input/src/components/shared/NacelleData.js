import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import NacelleDataFetcher from './NacelleDataFetcher'
import { GET_PRODUCTS, GET_COLLECTIONS } from '../../queries'
import { SpaceOptionsContext } from '../../context'

const NacelleData = ({ dataType, active, searchTerm }) => {
  const { spaceOptions } = useContext(SpaceOptionsContext)
  switch (dataType) {
    case 'products':
      return (
        <NacelleDataFetcher
          query={GET_PRODUCTS}
          options={spaceOptions}
          className="tabContent"
          active={active}
          id="products-panel"
          type="products"
          searchTerm={searchTerm}
        />
      )
    case 'collections':
      return (
        <NacelleDataFetcher
          query={GET_COLLECTIONS}
          options={spaceOptions}
          className="tabContent"
          active={active}
          id="collections-panel"
          type="productCollections"
          searchTerm={searchTerm}
        />
      )
  }
}

NacelleData.propTypes = {
  dataType: PropTypes.string.isRequired,
  active: PropTypes.bool,
  searchTerm: PropTypes.string
}

export default NacelleData
