export default function getShopifyVariantFromNacelleId(
  nacelleVariantId: string
): string {
  try {
    // if it starts with gid, assume it's a shopify id and return it
    if (nacelleVariantId.startsWith('gid://')) {
      return nacelleVariantId;
    }
    let shopifyId = nacelleVariantId;
    let decodedId = nacelleVariantId;
    if (!nacelleVariantId.startsWith('id://')) {
      if (typeof window !== 'undefined') {
        decodedId = atob(nacelleVariantId);
      } else {
        decodedId = Buffer.from(nacelleVariantId, 'base64').toString('utf-8');
      }
    }
    if (decodedId.startsWith('gid://')) {
      return decodedId;
    }
    const nacelleEntryIdParts = parseDecodedNacelleEntryId(decodedId);
    const dataType = convertDataTypeToShopifyDataType(
      nacelleEntryIdParts.dataType
    );
    shopifyId = `gid://shopify/${dataType}/${nacelleEntryIdParts.sourceEntryId}`;

    return shopifyId;
  } catch {
    throw new Error(
      'Invalid Nacelle Id. Need to pass a NacelleEntryId or Shopify Id'
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
): 'Product' | 'ProductVariant' | 'Collection' {
  switch (dataType) {
    case 'COLLECTION':
      return 'Collection';
    case 'PRODUCT':
      return 'Product';
    default:
      return 'ProductVariant';
  }
}
