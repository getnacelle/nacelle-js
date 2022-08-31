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
    if (line.nacelleEntryId) {
      const shopifyId = getShopifyIdFromNacelleId(line.nacelleEntryId);
      const shopifyItem: CartLineInput | CartLineUpdateInput = {
        attributes: line.attributes,
        quantity: line.quantity,
        sellingPlanId: line.sellingPlanId,
        merchandiseId: shopifyId
      };
      if ((line as NacelleCartLineItemUpdateInput).id) {
        (shopifyItem as CartLineUpdateInput).id = (
          line as NacelleCartLineItemUpdateInput
        ).id;
        return shopifyItem as CartLineUpdateInput;
      }
      return shopifyItem;
    } else {
      return line as CartLineUpdateInput;
    }
  }) as CartLineInput[] | CartLineUpdateInput[];
}
