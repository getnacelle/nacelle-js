// NOTE: @index directives are for the 'Generate Index' VSCode Extension (jayfong.generate-index)
//  once the 'Generate Index' extension is installed,
//  open the command palette with Command+Shift+P / Ctrl+Shift+P,
//  then search for & select 'Generate Index'

// EXPORT COMPOSABLES
// @index('./composables/*.js', (f, _) => `export { default as ${_.camelCase(f.name)} } from '${f.path}';`)
// export { default as useSpaceProvider } from './composables/useSpaceProvider';
// @endindex

// EXPORT PROVIDERS
// @index('./providers/*.js', (f, _) => `export { default as ${_.pascalCase(f.name)} } from '${f.path}';`)
// export { default as SpaceProvider } from './providers/SpaceProvider';
// @endindex

// EXPORT UTILS
// @index('./utils/**/*.js', (f, _) => `export { default as ${_.camelCase(f.name)} } from '${f.path}';`)
export { default as getProductOptions } from './utils/products/getProductOptions';
export { default as getSelectedVariant } from './utils/products/getSelectedVariant';
// @endindex
