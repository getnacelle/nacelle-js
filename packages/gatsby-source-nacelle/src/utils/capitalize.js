/**
 * Capitalizes the first letter of a word
 * @param {string} word
 * @returns string
 */
module.exports = function capitalize(word) {
  return word.charAt(0).toLocaleUpperCase() + word.slice(1);
};
