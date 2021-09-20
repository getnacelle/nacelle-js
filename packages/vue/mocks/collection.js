export default {
  handle: 'shirts',
  productLists: [{ handles: ['shirt'] }],
  products: [
    {
      handle: 'shirt',
      variants: [
        {
          name: 'blue-shirt',
          selectedOptions: [{ name: 'color', value: 'blue' }]
        },
        {
          name: 'red-shirt',
          selectedOptions: [{ name: 'color', value: 'red' }]
        },
        {
          name: 'green-shirt',
          selectedOptions: [{ name: 'color', value: 'green' }]
        }
      ]
    }
  ]
};
