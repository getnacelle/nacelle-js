import { getShopifyIdFromNacelleId } from '.';
import type { NacelleCartLineItemUpdateInput } from '../types/cart.type';
import type { CartLineInput, CartLineUpdateInput } from '../types/shopify.type';

/**
 * If type input `T` is an array of objects containing properties of `NacelleCartLineItemUpdateInput`, we'll return `CartLineUpdateInput[]`. Otherwise, we'll return `CartLineInput[]`.
 */
type InputOrUpdateInput<T> = T extends NacelleCartLineItemUpdateInput[]
  ? CartLineUpdateInput[]
  : CartLineInput[];

export default function transformNacelleLineItemToShopifyLineItem<
  T extends Partial<NacelleCartLineItemUpdateInput>[]
>(nacelleLines: T): InputOrUpdateInput<T> {
  return nacelleLines?.map((line) => {
    const { nacelleEntryId, ...rest } = line;
    const shopifyItem = { ...rest } as CartLineInput | CartLineUpdateInput;
    if (nacelleEntryId) {
      shopifyItem.merchandiseId = getShopifyIdFromNacelleId(nacelleEntryId);
    }
    return shopifyItem;
  }) as InputOrUpdateInput<T>;
}
