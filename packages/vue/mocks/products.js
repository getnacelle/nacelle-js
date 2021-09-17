export default [
  {
    facets: [{ name: 'color', value: 'blue' }],
    handle: 'shirt',
    id: 'shirt-1',
    options: [{ name: 'color', values: ['blue', 'red'] }],
    priceRange: { currencyCode: 'USD', max: 65, min: 65 },
    minPrice: 65,
    variants: [
      {
        id: 'shirt-v-1',
        name: 'blue-shirt',
        selectedOptions: [
          { name: 'color', value: 'blue' },
          { name: 'size', value: 'large' }
        ]
      },
      {
        id: 'shirt-v-2',
        name: 'red-shirt',
        selectedOptions: [
          { name: 'color', value: 'red' },
          { name: 'size', value: 'small' }
        ]
      }
    ]
  },
  {
    facets: [{ name: 'color', value: 'green' }],
    handle: 'shirt2',
    id: 'shirt-2',
    options: [{ name: 'color', values: ['green', 'purple'] }],
    priceRange: { currencyCode: 'USD', max: 25, min: 25 },
    minPrice: 25,
    variants: [
      {
        id: 'shirt2-v-1',
        name: 'green-shirt',
        selectedOptions: [
          { name: 'color', value: 'green' },
          { name: 'size', value: 'large' }
        ]
      },
      {
        id: 'shirt2-v-2',
        name: 'purple-shirt',
        selectedOptions: [
          { name: 'color', value: 'purple' },
          { name: 'size', value: 'small' }
        ]
      }
    ]
  },
  {
    facets: [{ name: 'color', value: 'blue' }],
    handle: 'shirt3',
    id: 'shirt-3',
    options: [{ name: 'color', values: ['blue', 'red'] }],
    priceRange: { currencyCode: 'USD', max: 10, min: 10 },
    minPrice: 10,
    variants: [
      {
        id: 'shirt3-v-1',
        name: 'blue-shirt',
        selectedOptions: [
          { name: 'color', value: 'blue' },
          { name: 'size', value: 'large' }
        ]
      },
      {
        id: 'shirt-v-2',
        name: 'red-shirt',
        selectedOptions: [
          { name: 'color', value: 'red' },
          { name: 'size', value: 'small' }
        ]
      }
    ]
  }
];
