export default {
  handle: 'shirt',
  id: 'shirt-1',
  options: [{ name: 'color', values: ['blue', 'red'] }],
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
};
