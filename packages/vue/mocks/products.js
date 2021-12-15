export default [
  {
    content: {
      metafields: null,
      options: [
        {
          name: 'size',
          values: ['small', 'large']
        },
        {
          name: 'color',
          values: ['blue', 'red']
        }
      ]
    },
    facets: [
      { name: 'color', value: 'blue' },
      { name: 'color', value: 'red' },
      { name: 'size', value: 'small' },
      { name: 'size', value: 'large' }
    ],
    handle: 'shirt',
    nacelleEntryId: 'shirt-1',
    priceRange: { currencyCode: 'USD', max: 65, min: 65 },
    minPrice: 65,
    tags: [],
    variants: [
      {
        nacelleEntryId: 'shirt-v-1',
        content: {
          name: 'blue-shirt',
          selectedOptions: [
            { name: 'color', value: 'blue' },
            { name: 'size', value: 'large' }
          ]
        }
      },
      {
        nacelleEntryId: 'shirt-v-2',
        content: {
          name: 'red-shirt',
          selectedOptions: [
            { name: 'color', value: 'red' },
            { name: 'size', value: 'small' }
          ]
        }
      }
    ]
  },
  {
    content: {
      metafields: null,
      options: [
        {
          name: 'size',
          values: ['small', 'large']
        },
        {
          name: 'color',
          values: ['green', 'purple']
        }
      ]
    },
    facets: [
      { name: 'color', value: 'green' },
      { name: 'color', value: 'purple' },
      { name: 'size', value: 'small' },
      { name: 'size', value: 'large' }
    ],
    handle: 'shirt2',
    nacelleEntryId: 'shirt-2',
    priceRange: { currencyCode: 'USD', max: 25, min: 25 },
    minPrice: 25,
    tags: [],
    variants: [
      {
        nacelleEntryId: 'shirt2-v-1',
        content: {
          name: 'green-shirt',
          selectedOptions: [
            { name: 'color', value: 'green' },
            { name: 'size', value: 'large' }
          ]
        }
      },
      {
        nacelleEntryId: 'shirt2-v-2',
        content: {
          name: 'purple-shirt',
          selectedOptions: [
            { name: 'color', value: 'purple' },
            { name: 'size', value: 'small' }
          ]
        }
      }
    ]
  },
  {
    content: {
      metafields: null,
      options: [
        {
          name: 'size',
          values: ['small', 'medium']
        },
        {
          name: 'color',
          values: ['blue', 'red']
        }
      ]
    },
    facets: [
      { name: 'color', value: 'blue' },
      { name: 'color', value: 'red' },
      { name: 'size', value: 'small' },
      { name: 'size', value: 'medium' }
    ],
    handle: 'shirt3',
    nacelleEntryId: 'shirt-3',
    priceRange: { currencyCode: 'USD', max: 10, min: 10 },
    minPrice: 10,
    tags: [],
    variants: [
      {
        nacelleEntryId: 'shirt3-v-1',
        content: {
          name: 'blue-shirt',
          selectedOptions: [
            { name: 'color', value: 'blue' },
            { name: 'size', value: 'medium' }
          ]
        }
      },
      {
        nacelleEntryId: 'shirt3-v-2',
        content: {
          name: 'red-shirt',
          selectedOptions: [
            { name: 'color', value: 'red' },
            { name: 'size', value: 'small' }
          ]
        }
      }
    ]
  }
];
