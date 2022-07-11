import React from 'react'
import PropTypes from 'prop-types'

import { Container, Menu } from '@sanity/ui'
import Entry from './Entry'

const Gallery = ({ data, active }) => {
  return (
    <Container
      overflow="auto"
      style={{
        maxHeight: '16rem',
        border: '1px solid #ddd',
        marginRight: '4px',
        display: !active ? 'none' : null
      }}
    >
      <Menu space={1} style={{ marginTop: '1rem' }}>
        {data &&
          data.map((item) => <Entry item={item} key={item.nacelleEntryId} />)}
      </Menu>
    </Container>
  )
}

Gallery.propTypes = {
  data: PropTypes.array,
  active: PropTypes.bool
}

export default Gallery
