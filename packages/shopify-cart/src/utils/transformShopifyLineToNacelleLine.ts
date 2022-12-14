import type { CartLine, NacelleCartLine } from '../types/cart.type';

export interface TransformShopifyCartLineParams {
  lines: CartLine[];
  shopifyShopId: string;
  locale: string;
}

export default function ({
  lines,
  shopifyShopId,
  locale
}: TransformShopifyCartLineParams): NacelleCartLine[] {
  return lines?.map((line) => {
    const shopifyVariantId = line.merchandise.sourceEntryId
      .split('gid://shopify/ProductVariant/')[1]
      .replace('/', '');

    let nacelleEntryId = `id://SHOPIFY/${shopifyShopId}/default/PRODUCT_VARIANT/${shopifyVariantId}/${locale}`;

    if (typeof window !== 'undefined') {
      nacelleEntryId = globalThis.btoa(nacelleEntryId);
    } else {
      nacelleEntryId = Buffer.from(nacelleEntryId).toString('base64');
    }

    return {
      ...line,
      merchandise: {
        ...line.merchandise,
        nacelleEntryId
      }
    };
  });
}
