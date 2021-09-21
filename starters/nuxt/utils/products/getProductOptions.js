/**
 * Util for getting product options
 * @param {Object} product
 * @returns {Array}
 */

export default ({ product }) => {
  if (product) {
    const options = [];
    product?.variants?.forEach(variant => {
      variant?.selectedOptions?.forEach(selectedOption => {
        let optionIndex = options.findIndex(
          option => option.name === selectedOption.name
        );
        if (optionIndex < 0) {
          options.push({ name: selectedOption.name, values: [] });
          optionIndex = options.length - 1;
        }
        const value = options[optionIndex].values.find(
          value => value === selectedOption.value
        );
        if (!value) options[optionIndex].values.push(selectedOption.value);
      });
    });
    return options;
  }
};
