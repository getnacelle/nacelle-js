import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { MenuItem, Box, Text, Flex } from '@sanity/ui'
import { ItemContext, SearchQueryContext } from '../../context'

const Thumb = ({ src }) => {
  return (
    <div style={{ width: '3rem', height: '3rem', background: `url(${src})` }} />
  )
}

Thumb.propTypes = {
  src: PropTypes.string
}

const Entry = ({ item }) => {
  const { setItem } = useContext(ItemContext)
  const { setSearchQuery } = useContext(SearchQueryContext)

  return (
    <MenuItem
      paddingX={2}
      onClick={() => {
        setItem(item.content.handle)
        setSearchQuery(null)
      }}
    >
      <Flex>
        {item.content.featuredMedia && (
          <Thumb src={item.content.featuredMedia.thumbnailSrc} />
        )}
        <Box padding={3} flex={1}>
          <Text size={2}>
            {item.content.title}{' '}
            <span style={{ color: '#89a' }}>({item.content.handle})</span>
          </Text>
        </Box>
      </Flex>
    </MenuItem>
  )
}

Entry.propTypes = {
  item: PropTypes.object
}

export default Entry
