import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

/* eslint-disable import/no-unresolved */
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'
import FormField from 'part:@sanity/components/formfields/default'
import { useId } from '@reach/auto-id'
import config from 'config:@nacelle/sanity-plugin-nacelle-input'
/* eslint-enable import/no-unresolved */

import {
  ThemeProvider,
  studioTheme,
  Box,
  TextInput,
  Button,
  Dialog,
  Stack,
  Flex
} from '@sanity/ui'
import NacelleData from './shared/NacelleData'
import Interface from './shared/Interface'
import {
  ItemContext,
  SearchQueryContext,
  SpaceOptionsContext
} from '../context'

const createPatchFrom = (value) =>
  PatchEvent.from(value === '' ? unset() : set(value))

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
            (s) => s.spaceId && s.spaceToken && s.spaceName
          )
        : {}
      setSpaceOptions(initialSpace)
    }
  }, [spaceOptions])

  const item = value || ''

  const inputId = useId()

  const selectItem = (item) => {
    onChange(createPatchFrom(item))
    onClose()
  }

  const dataTypeFromOptions = type.options && type.options.dataType
  let dataType = []

  if (!dataTypeFromOptions) {
    dataType = ['collections', 'products']
  } else {
    dataType = Array.isArray(dataTypeFromOptions)
      ? dataTypeFromOptions
      : [dataTypeFromOptions]
  }

  dataType = dataType.sort()

  return (
    <ThemeProvider theme={studioTheme}>
      {interfaceOpen && (
        <Dialog
          header="Indexed PIM Data"
          id="dialog-example"
          onClose={onClose}
          width={1}
          zOffset={1000}
        >
          <ItemContext.Provider value={{ item, setItem: selectItem }}>
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
                  {dataType[activeTab] && (
                    <NacelleData
                      key={dataType[activeTab]}
                      dataType={dataType[activeTab]}
                      active={true}
                      searchTerm={searchQuery || ''}
                    />
                  )}
                </Interface>
              </SpaceOptionsContext.Provider>
            </SearchQueryContext.Provider>
          </ItemContext.Provider>
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
                value={item}
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
