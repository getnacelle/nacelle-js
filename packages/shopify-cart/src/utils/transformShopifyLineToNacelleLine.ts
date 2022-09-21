import { CartLine, NacelleCartLine } from '../types/cart.type';

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

    return {
      ...line,
      merchandise: {
        ...line.merchandise,
        nacelleEntryId: btoa(
          `id://SHOPIFY/${shopifyShopId}/default/PRODUCT_VARIANT/${shopifyVariantId}/${locale}`
        )
      }
    };
  });
}
