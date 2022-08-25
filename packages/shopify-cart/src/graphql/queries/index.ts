// NOTE: @index directives are for the 'Generate Index' VSCode Extension (jayfong.generate-index)
//  once the 'Generate Index' extension is installed,
//  open the command palette with Command+Shift+P / Ctrl+Shift+P,
//  then search for & select 'Generate Index'

// EXPORT QUERIES
// @index('./!(*.spec).ts', (f, _) => `import { default as ${_.camelCase(f.name)} } from '${f.path}';`)
import { default as cart } from './cart';
// @endindex

export default {
  // @index('./!(*.spec).ts', (f, _) => `${_.constantCase(f.name)}: ${f.name},`)
  CART: cart
  // @endindex
};
