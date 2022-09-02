import {
  NacelleCartLineItemInput,
  NacelleCartLineItemUpdateInput
} from '../types/cart.type';
import { CartLineInput, CartLineUpdateInput } from '../types/shopify.type';
import { getShopifyIdFromNacelleId } from '.';

export default function (
  nacelleLines: NacelleCartLineItemInput[] | NacelleCartLineItemUpdateInput[]
): CartLineInput[] | CartLineUpdateInput[] {
  return nacelleLines?.map((line) => {
    const { nacelleEntryId, ...rest } = line;
    const shopifyItem = { ...rest } as CartLineInput | CartLineUpdateInput;
    if (nacelleEntryId) {
      shopifyItem.merchandiseId = getShopifyIdFromNacelleId(nacelleEntryId);
    }
    return shopifyItem;
  }) as CartLineInput[] | CartLineUpdateInput[];
}
