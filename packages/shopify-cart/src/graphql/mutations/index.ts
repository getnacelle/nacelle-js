// NOTE: @index directives are for the 'Generate Index' VSCode Extension (jayfong.generate-index)
//  once the 'Generate Index' extension is installed,
//  open the command palette with Command+Shift+P / Ctrl+Shift+P,
//  then search for & select 'Generate Index'

// EXPORT MUTATIONS
// @index('./!(*.spec).ts', (f, _) => `import { default as ${_.camelCase(f.name)} } from '${f.path}';`)
import { default as cartAttributesUpdate } from './cartAttributesUpdate';
import { default as cartBuyerIdentityUpdate } from './cartBuyerIdentityUpdate';
import { default as cartCreate } from './cartCreate';
import { default as cartDiscountCodesUpdate } from './cartDiscountCodesUpdate';
import { default as cartLineAdd } from './cartLineAdd';
import { default as cartLineRemove } from './cartLineRemove';
import { default as cartLineUpdate } from './cartLineUpdate';
import { default as cartNoteUpdate } from './cartNoteUpdate';
import { default as cartSelectedDeliveryOptionsUpdate } from './cartSelectedDeliveryOptionsUpdate';
// @endindex

export default {
  // @index('./!(*.spec).ts', (f, _) => `${_.constantCase(f.name)}: ${f.name},`)
  CART_ATTRIBUTES_UPDATE: cartAttributesUpdate,
  CART_BUYER_IDENTITY_UPDATE: cartBuyerIdentityUpdate,
  CART_CREATE: cartCreate,
  CART_DISCOUNT_CODES_UPDATE: cartDiscountCodesUpdate,
  CART_LINE_ADD: cartLineAdd,
  CART_LINE_REMOVE: cartLineRemove,
  CART_LINE_UPDATE: cartLineUpdate,
  CART_NOTE_UPDATE: cartNoteUpdate,
  CART_SELECTED_DELIVERY_OPTIONS_UPDATE: cartSelectedDeliveryOptionsUpdate
  // @endindex
};
