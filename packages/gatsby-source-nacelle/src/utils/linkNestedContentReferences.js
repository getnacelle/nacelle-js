function findNestedReferences(contentObject = {}, parent = null, key) {
  if (Array.isArray(contentObject)) {
    // if it's an array & has a nacelleEntryId
    // it's got top level nodes that we can link to instead
    if (contentObject[0]?.nacelleEntryId) {
      parent[`${key}___NODE`] = contentObject.map(
        (entry) => `NacelleContent-${entry.nacelleEntryId}`
      );
      // delete the contentObject from the parent so that it doesn't conflict
      // with the node link
      delete parent[key];
    } else {
      // if not a reference, look for references in each part of the array instead
      Object.entries(contentObject).map(([key, value]) =>
        findNestedReferences(value, contentObject, key)
      );
    }
  } else if (contentObject && typeof contentObject === 'object') {
    // if the object has a nacelleEntryId, treat it as a reference to other content
    if (contentObject.nacelleEntryId) {
      parent[
        `${key}___NODE`
      ] = `NacelleContent-${contentObject.nacelleEntryId}`;
      delete parent[key];
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
