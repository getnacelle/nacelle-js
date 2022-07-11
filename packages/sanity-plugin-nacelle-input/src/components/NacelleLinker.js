import React, { useState, useEffect, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'

import { useId } from '@reach/auto-id'

/* eslint-disable import/no-unresolved */
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'
import FormField from 'part:@sanity/components/formfields/default'
import config from 'config:@nacelle/sanity-plugin-nacelle-input'
/* eslint-enable import/no-unresolved */

import {
  ThemeProvider,
  studioTheme,
  Box,
  TextInput,
  Button,
  Dialog,
  Select,
  Tab,
  TabList,
  TabPanel,
  Stack,
  Flex
} from '@sanity/ui'
import NacelleDataFetcher from './NacelleDataFetcher'
import { GET_PRODUCTS, GET_COLLECTIONS } from '../queries'
import {
  HandleContext,
  SearchQueryContext,
  SpaceOptionsContext
} from '../context'

const createPatchFrom = (value) =>
  PatchEvent.from(value === '' ? unset() : set(value))

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

const SearchIcon = () => (
  <svg
    data-sanity-icon="search"
    width="1em"
    height="1em"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="10.5"
      cy="10.5"
      r="5"
      stroke="currentColor"
      strokeWidth="1.2"
    ></circle>
    <path d="M14 14L20 20" stroke="currentColor" strokeWidth="1.2"></path>
  </svg>
)

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
      (s) => s.nacelleEndpoint && s.nacelleSpaceToken && s.spaceName
    )

  const onSelect = (e) => {
    const activeSpace = config.nacelleSpaces.find(
      (space) => space.nacelleEndpoint == e.target.value
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
            defaultValue={spaceOptions?.nacelleEndpoint}
          >
            {config.nacelleSpaces.map((space, idx) => (
              <option
                value={space.nacelleEndpoint}
                key={`${space.spaceName}-${idx}`}
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

const NacelleLinker = ({ type, onChange, value, markers, level, readOnly }) => {
  const [searchQuery, setSearchQuery] = useState(null)
  const [spaceOptions, setSpaceOptions] = useState(null)
  const [activeTab, setActiveTab] = useState(0)
  const [interfaceOpen, setInterfaceOpen] = useState(false)
  const onClose = useCallback(() => setInterfaceOpen(false), [])
  const onQueryUpdate = useCallback((query) => {
    setSearchQuery(query)
  }, [])

  useEffect(() => {
    if (!spaceOptions) {
      const initialSpace = Array.isArray(config.nacelleSpaces)
        ? config.nacelleSpaces.find(
            (s) => s.nacelleEndpoint && s.nacelleSpaceToken && s.spaceName
          )
        : {}
      setSpaceOptions(initialSpace)
    }
  }, [spaceOptions])

  const handle = value || ''

  const inputId = useId()

  const selectItem = (handle) => {
    onChange(createPatchFrom(handle))
    onClose()
  }

  const dataTypeFromOptions = type.options && type.options.dataType
  let dataType

  if (!dataTypeFromOptions) {
    dataType = ['collections', 'products']
  } else {
    dataType = Array.isArray(dataTypeFromOptions)
      ? dataTypeFromOptions
      : [dataTypeFromOptions]
  }

  return (
    <ThemeProvider theme={studioTheme}>
      {interfaceOpen && (
        <Dialog
          header="Product/Collection Data"
          id="dialog-example"
          onClose={onClose}
          width={1}
          zOffset={1000}
        >
          <HandleContext.Provider value={{ handle, setHandle: selectItem }}>
            <SearchQueryContext.Provider
              value={{ searchQuery, setSearchQuery }}
            >
              <SpaceOptionsContext.Provider
                value={{ spaceOptions, setSpaceOptions }}
              >
                <Interface
                  dataType={dataType}
                  interfaceOpen={interfaceOpen}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                >
                  <TextInput
                    fontSize={[2, 2, 3]}
                    icon={SearchIcon}
                    placeholder="Search indexed entries"
                    onChange={(event) =>
                      onQueryUpdate(event.currentTarget.value)
                    }
                    value={searchQuery || ''}
                  />
                  {dataType.map((type, idx) => (
                    <NacelleData
                      key={type}
                      dataType={type}
                      active={idx === activeTab}
                      searchTerm={searchQuery || ''}
                    />
                  ))}
                </Interface>
              </SpaceOptionsContext.Provider>
            </SearchQueryContext.Provider>
          </HandleContext.Provider>
        </Dialog>
      )}
      <FormField
        label={type.title}
        markers={markers}
        description={type.description}
        level={level}
      >
        <Stack space={3}>
          <Flex>
            <Box flex={1}>
              <TextInput
                id={inputId}
                value={handle}
                onChange={(e) => selectItem(e.target.value)}
              />
            </Box>
            <Box marginLeft={1}>
              <Button
                mode="ghost"
                type="button"
                tone={interfaceOpen ? 'critical' : 'default'}
                disabled={readOnly}
                onClick={() => setInterfaceOpen(!interfaceOpen)}
                text={'Select'}
              />
              <Button
                mode="ghost"
                type="button"
                tone={interfaceOpen ? 'critical' : 'default'}
                disabled={readOnly}
                onClick={() => selectItem('')}
                text={'Clear'}
              />
            </Box>
          </Flex>
        </Stack>
      </FormField>
    </ThemeProvider>
  )
}

NacelleLinker.propTypes = {
  type: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    options: PropTypes.shape({
      dataType: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
    })
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  markers: PropTypes.any,
  level: PropTypes.number,
  value: PropTypes.string,
  readOnly: PropTypes.bool
}

export default React.forwardRef((props, ref) => (
  <NacelleLinker {...props} forwardedRef={ref} />
))
