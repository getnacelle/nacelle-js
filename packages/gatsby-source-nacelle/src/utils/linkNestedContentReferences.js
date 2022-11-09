const isUnresolvableNacelleReference = require('./isUnresolvableNacelleReference');

function findNestedReferences(contentObject = {}, parent = null, key) {
  if (Array.isArray(contentObject)) {
    // if it's an array & has a nacelleEntryId
    // it's got top level nodes that we can link to instead
    if (contentObject[0]?.nacelleEntryId) {
      // filter out any unresolvable nacelle references since these won't exist in the Gatsby Node system and break builds.
      let filteredContent = contentObject.filter((entry) => {
        return !isUnresolvableNacelleReference(entry);
      });
      // if there are assets, don't try to link to prevent assets from being included in Node linking
      if (filteredContent.some((entry) => entry.type === 'asset')) {
        return;
      }
      parent[`${key}___NODE`] = filteredContent.map(
        (entry) => `NacelleContent-${entry.nacelleEntryId}`
      );
      // delete the contentObject from the parent so that it doesn't conflict
      // with the node link
      delete parent[key];
    } else if (contentObject[0]?._type === 'block') {
      // if the array's entry type is block, it's a Sanity Portable (Rich) Text block, so stringify it to JSON so it's easy to fetch
      parent[key] = JSON.stringify(contentObject);
    } else {
      // if not a reference & not Sanity rich text, look for references in each part of the array instead
      Object.entries(contentObject).map(([key, value]) =>
        findNestedReferences(value, contentObject, key)
      );
    }
  } else if (contentObject && typeof contentObject === 'object') {
    // if the object has a nacelleEntryId, treat it as a reference to other content
    if (contentObject.nacelleEntryId) {
      // if it's an image node, don't do anything
      if (contentObject.type === 'asset') {
        return;
      }
      // only mark the reference if it's resolvable, but we still want to delete the object from the parent since it's not really a useable reference
      if (!isUnresolvableNacelleReference(contentObject)) {
        parent[
          `${key}___NODE`
        ] = `NacelleContent-${contentObject.nacelleEntryId}`;
      }
      delete parent[key];
      // if we've stringified  the rich text, don't keep traversing the object since it's now a string
    } else if (contentObject.nodeType === 'document') {
      parent[key] = JSON.stringify(contentObject);
    } else {
      // otherwise keep traversing, looking for more references
      Object.entries(contentObject).map(([key, value]) =>
        findNestedReferences(value, contentObject, key)
      );
    }
  } else {
    return;
  }
}

module.exports = findNestedReferences;
