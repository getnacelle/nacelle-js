// NOTE: @index directives are for the 'Generate Index' VSCode Extension (jayfong.generate-index)
//  once the 'Generate Index' extension is installed,
//  open the command palette with Command+Shift+P / Ctrl+Shift+P,
//  then search for & select 'Generate Index'

// EXPORT CLIENT ACTIONS
// @index('./!(*.spec).ts', (f, _) => `export { default as ${_.camelCase(f.name)} } from '${f.path}';`)
export { default as checkoutAttributesUpdate } from './checkoutAttributesUpdate';
export { default as checkoutCreate } from './checkoutCreate';
export { default as checkoutLineItemsReplace } from './checkoutLineItemsReplace';
export { default as findCheckout } from './findCheckout';
export { default as putCheckout } from './putCheckout';
export { default as applyDiscount } from './applyDiscount';
export { default as removeDiscount } from './removeDiscount';
// @endindex
