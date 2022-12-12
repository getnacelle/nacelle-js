export default function getShopifyVariantFromNacelleId(
  nacelleVariantId: string
): string {
  try {
    let decodedId = nacelleVariantId;
    // note: can possibly use atob without window check when Node 14 is end of life
    // see discussion: https://github.com/getnacelle/nacelle-js/pull/223/files#r960111641
    if (typeof window !== 'undefined') {
      decodedId = globalThis.atob(nacelleVariantId);
    } else {
      decodedId = Buffer.from(nacelleVariantId, 'base64').toString('utf-8');
    }
    const nacelleEntryIdParts = parseDecodedNacelleEntryId(decodedId);
    const dataType = convertDataTypeToShopifyDataType(
      nacelleEntryIdParts.dataType
    );
    return `gid://shopify/${dataType}/${nacelleEntryIdParts.sourceEntryId}`;
  } catch {
    throw new Error(
      'Invalid Nacelle Entry Id for Cart - must be a Product Variant Nacelle Entry Id'
    );
  }
}

type DataTypes = 'CONTENT' | 'PRODUCT' | 'PRODUCT_VARIANT' | 'COLLECTION';
type SourceName = 'CONTENTFUL' | 'SANITY' | 'SHOPIFY';

interface NacelleEntryIdProperties {
  /**
   * A Nacelle data type
   * @example
   * 'CONTENT'
   */
  dataType: DataTypes;

  /**
   * An IETF locale
   * @example
   * 'en-US'
   */
  locale: string;

  /**
   * A Nacelle source name
   * @example
   * 'CONTENTFUL'
   * @example
   * 'SHOPIFY'
   */
  sourceName: SourceName;

  /**
   * An ID assigned to a piece of data by an upstream system
   * @example
   * 'MTIzNDU2Nzg='
   */
  sourceEntryId: string;

  /**
   * A source environment name
   * @example
   * 'master' (the default production environment name in Contentful)
   * @example
   * 'default' (for systems with no concept of environments, such as Shopify)
   */
  sourceSubset: string;

  /**
   * A source space ID
   * @example
   * '1xqo9yrzp7yz' (a Contentful Space ID)
   * @example
   * 'gamma-nova-jewelry' (a Shopify Shop ID / "subdomain")
   */
  externalId: string;
}

function parseDecodedNacelleEntryId(id: string): NacelleEntryIdProperties {
  const [, entryIdImportantParts] = id.split('id://');
  const nacelleEntryIdParts = entryIdImportantParts.split('/');
  return {
    sourceName: nacelleEntryIdParts[0] as SourceName,
    externalId: nacelleEntryIdParts[1],
    sourceSubset: nacelleEntryIdParts[2],
    dataType: nacelleEntryIdParts[3] as DataTypes,
    sourceEntryId: nacelleEntryIdParts[4],
    locale: nacelleEntryIdParts[5]
  };
}

function convertDataTypeToShopifyDataType(
  dataType: DataTypes
): 'ProductVariant' {
  if (dataType === 'PRODUCT_VARIANT') {
    return 'ProductVariant';
  } else {
    throw new Error('Only Product Variant Ids allowed');
  }
}
