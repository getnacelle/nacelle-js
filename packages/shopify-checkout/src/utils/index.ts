// NOTE: @index directives are for the 'Generate Index' VSCode Extension (jayfong.generate-index)
//  once the 'Generate Index' extension is installed,
//  open the command palette with Command+Shift+P / Ctrl+Shift+P,
//  then search for & select 'Generate Index'

// EXPORT UTILS
// @index('./!(*.spec).ts', (f, _) => `export { default as ${_.camelCase(f.name)} } from '${f.path}';`)
export { default as buildCheckout } from './buildCheckout';
export { default as cartItemsToCheckoutItems } from './cartItemsToCheckoutItems';
export { default as createGqlClient } from './createGqlClient';
export { default as gql } from './gql';
export { default as handleShopifyError } from './handleShopifyError';
export { default as isVerifiedCheckoutId } from './isVerifiedCheckoutId';
export { default as metafieldsToCustomAttributes } from './metafieldsToCustomAttributes';
export { default as transformVariantIdToGid } from './transformVariantIdToGid';
// @endindex
