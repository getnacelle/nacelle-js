/**
 * Transforms variant ids to valid PlainText shopify gids
 * If the variant id is a valid gid, that gid will be returned instead.
 * If the variant is a Base64 encoded gid, that gid will be returned
 * @param variantId - the variant id to transform
 * @returns gid - a valid shopify variant gid of the form gid://shopify/ProductVariant/{numeric-id}
 */
export default function (variantId: string): string {
  // if it's already a global id, just return it
  if (isPlainTextGlobalId(variantId)) {
    return variantId;
  }

  if (isNumeric(variantId)) {
    return idToVariantGid(variantId);
  }

  const decodedVariantId = decodeBase64Id(variantId);

  if (isPlainTextGlobalId(decodedVariantId)) {
    return decodedVariantId;
  }
  // otherwise it's absolutely not a valid id and we should throw
  throw Error(`${variantId} is an invalid shopify variant id`);
}

function isPlainTextGlobalId(variantId: string) {
  return variantId.startsWith('gid://shopify/');
}

function isNumeric(variantId: string) {
  return !Number.isNaN(Number(variantId));
}

function decodeBase64Id(variantId: string): string {
  try {
    // if window undefined, we're in node
    if (typeof window === 'undefined') {
      // if the decoded & re-encoded string is the same as the original, decode it. This is b/c Buffer.from won't error on invalid chars
      if (Buffer.from(variantId, 'base64').toString('base64') === variantId) {
        return Buffer.from(variantId, 'base64').toString();
      } else {
        // if it's not valid base64, just return it
        return variantId;
      }
    } else {
      // we're in the browser so use browser methods
      // window.atob will throw if there are invalid chars, so we don't need to be as safe here
      return window.atob(variantId);
    }
  } catch (err) {
    return variantId;
  }
}

function idToVariantGid(variantId: string): string {
  return `gid://shopify/ProductVariant/${variantId}`;
}
