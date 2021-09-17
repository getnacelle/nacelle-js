// NOTE: @index directives are for the 'Generate Index' VSCode Extension (jayfong.generate-index)
//  once the 'Generate Index' extension is installed,
//  open the command palette with Command+Shift+P / Ctrl+Shift+P,
//  then search for & select 'Generate Index'

// EXPORT COMPOSABLES
// @index('./composables/*.js', (f, _) => `export { default as ${_.camelCase(f.name)} } from '${f.path}';`)
export { default as useCollectionProvider } from './composables/useCollectionProvider';
export { default as useEventProvider } from './composables/useEventProvider';
export { default as useProductProvider } from './composables/useProductProvider';
export { default as useRefinementProvider } from './composables/useRefinementProvider';
export { default as useSdk } from './composables/useSdk';
export { default as useSearchProvider } from './composables/useSearchProvider';
export { default as useSpaceProvider } from './composables/useSpaceProvider';
// @endindex

// EXPORT PROVIDERS
// @index('./providers/*.js', (f, _) => `export { default as ${_.camelCase(f.name)} } from '${f.path}';`)
export { default as cartProvider } from './providers/CartProvider';
export { default as collectionProvider } from './providers/CollectionProvider';
export { default as eventProvider } from './providers/EventProvider';
export { default as productProvider } from './providers/ProductProvider';
export { default as refinementProvider } from './providers/RefinementProvider';
export { default as searchProvider } from './providers/SearchProvider';
export { default as spaceProvider } from './providers/SpaceProvider';
// @endindex

// EXPORT UTILS
// @index('./utils/**/*.js', (f, _) => `export { default as ${_.camelCase(f.name)} } from '${f.path}';`)
export { default as getProductOptions } from './utils/products/getProductOptions';
export { default as getSelectedVariant } from './utils/products/getSelectedVariant';
// @endindex
