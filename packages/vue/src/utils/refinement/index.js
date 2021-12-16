// NOTE: @index directives are for the 'Generate Index' VSCode Extension (jayfong.generate-index)
//  once the 'Generate Index' extension is installed,
//  open the command palette with Command+Shift+P / Ctrl+Shift+P,
//  then search for & select 'Generate Index'

// EXPORT REFINEMENT UTILS
// @index('./*.js', (f, _) => `export { default as ${_.camelCase(f.name)} } from '${f.path}';`)
export { default as filterProducts } from './filterProducts';
export { default as sortProducts } from './sortProducts';
// @endindex
