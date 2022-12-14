// NOTE: @index directives are for the 'Generate Index' VSCode Extension (jayfong.generate-index)
//  once the 'Generate Index' extension is installed,
//  open the command palette with Command+Shift+P / Ctrl+Shift+P,
//  then search for & select 'Generate Index'

// EXPORT CLIENT ACTIONS
// @index('./!(*.spec).ts', (f, _) => `export { default as ${_.camelCase(f.name)} } from '${f.path}';`)
export { default as cart } from './cart';
export { default as cartAttributesUpdate } from './cartAttributesUpdate';
export { default as cartBuyerIdentityUpdate } from './cartBuyerIdentityUpdate';
export { default as cartCreate } from './cartCreate';
export { default as cartDiscountCodesUpdate } from './cartDiscountCodesUpdate';
export { default as cartLinesAdd } from './cartLinesAdd';
export { default as cartLinesRemove } from './cartLinesRemove';
export { default as cartLinesUpdate } from './cartLinesUpdate';
export { default as cartNoteUpdate } from './cartNoteUpdate';
export { default as cartSelectedDeliveryOptionsUpdate } from './cartSelectedDeliveryOptionsUpdate';
// @endindex
