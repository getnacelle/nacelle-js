import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Box, Select, Tab, TabList, TabPanel, Stack } from '@sanity/ui'
import { SpaceOptionsContext } from '../../context'

/* eslint-disable import/no-unresolved */
import config from 'config:@nacelle/sanity-plugin-nacelle-input'
/* eslint-enable import/no-unresolved */

const Interface = ({
  dataType,
  interfaceOpen,
  children,
  activeTab,
  setActiveTab
}) => {
  const { spaceOptions, setSpaceOptions } = useContext(SpaceOptionsContext)

  const dataTypes = Array.isArray(dataType) ? dataType.sort() : [dataType]
  const multiTab = dataTypes.length > 1

  const multiSelect =
    Array.isArray(config.nacelleSpaces) &&
    config.nacelleSpaces.length > 1 &&
    config.nacelleSpaces.some(
      (s) => s.spaceEndpoint && s.spaceToken && s.spaceName
    )

  const onSelect = (e) => {
    const activeSpace = config.nacelleSpaces.find(
      (space) => space.spaceEndpoint == e.target.value
    )
    setSpaceOptions(activeSpace)
  }

  return (
    <Box style={{ display: interfaceOpen ? 'block' : 'none' }} padding={4}>
      <Stack space={4} paddingBottom={2}>
        {multiSelect && (
          <Select
            className="select"
            onChange={onSelect}
            defaultValue={spaceOptions?.spaceId}
          >
            {config.nacelleSpaces.map((space, idx) => (
              <option
                value={space.spaceEndpoint}
                key={`${space.spaceId}-${idx}`}
              >
                {space.spaceName}
              </option>
            ))}
          </Select>
        )}
        {multiTab && (
          <TabList className="tab">
            {dataTypes.map((type, idx) => (
              <Tab
                key={type}
                label={type}
                selected={idx === activeTab}
                className="tablinks"
                onClick={() => setActiveTab(idx)}
                space={2}
              />
            ))}
          </TabList>
        )}
      </Stack>
      <TabPanel>{children}</TabPanel>
    </Box>
  )
}

Interface.propTypes = {
  dataType: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  interfaceOpen: PropTypes.bool.isRequired,
  activeTab: PropTypes.number,
  setActiveTab: PropTypes.func,
  children: PropTypes.node
}

export default Interface
