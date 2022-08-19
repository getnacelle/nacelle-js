import NacelleReference from './components/NacelleReference'

export default {
  title: 'Nacelle Reference',
  name: 'nacelleReference',
  type: 'object',
  inputComponent: NacelleReference,
  fields: [
    {
      title: 'Type',
      name: 'type',
      type: 'string'
    },
    {
      title: 'Reference type',
      name: 'referenceType',
      type: 'string'
    },
    {
      title: 'Nacelle Entry ID',
      name: 'nacelleEntryId',
      type: 'string'
    },
    {
      title: 'Handle',
      name: 'handle',
      type: 'string'
    },
    {
      title: 'Locale',
      name: 'locale',
      type: 'string'
    }
  ]
}
