/**
 * Shallow replace an object's properties
 * @param {Object} obj - the object containing the old properties
 * @param {Object[]} keyMappings - an array of key mappings
 * @param {string} keyMappings[].oldKey - the property to be replaced
 * @param {string} keyMappings[].newKey - the property to replace with
 * @returns {Object} New object with updated properties
 */
function replaceKey(obj, keyMappings) {
  const o = { ...obj };
  try {
    for (const { oldKey, newKey } of keyMappings) {
      delete Object.assign(o, { [newKey]: o[oldKey] })[oldKey];
    }

    for (const [key, value] of Object.entries(o)) {
      if (value && Array.isArray(value)) {
        value.forEach((item, index) => {
          if (item && typeof item === 'object') {
            o[key][index] = replaceKey(o[key][index], keyMappings);
          }
        });
      } else if (value && typeof value === 'object') {
        o[key] = replaceKey(o[key], keyMappings);
      }
    }

    return o;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = replaceKey;
