// NOTE: @index directives are for the 'Generate Index' VSCode Extension (jayfong.generate-index)
//  once the 'Generate Index' extension is installed,
//  open the command palette with Command+Shift+P / Ctrl+Shift+P,
//  then search for & select 'Generate Index'

// EXPORT QUERIES
// @index('./!(*.spec|test).ts', (f, _) => `import { default as ${_.camelCase(f.name)} } from '${f.path}.js';`)
import { default as navigation } from './navigation.js';
import { default as spaceProperties } from './spaceProperties.js';
// @endindex

export default {
	// @index('./!(*.spec|test).ts', (f, _) => `${_.constantCase(f.name)}: ${f.name},`)
	NAVIGATION: navigation,
	SPACE_PROPERTIES: spaceProperties
	// @endindex
};
