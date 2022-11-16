const CannotFindNacelleReferenceMessage = 'Cannot find Nacelle reference';

function isUnresolvableNacelleReference(entry) {
  return (
    entry.nacelleEntryId &&
    entry.type === 'NacelleReference' &&
    entry.message === CannotFindNacelleReferenceMessage
  );
}

module.exports = isUnresolvableNacelleReference;
