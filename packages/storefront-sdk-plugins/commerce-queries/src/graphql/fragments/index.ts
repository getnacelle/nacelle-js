// NOTE: @index directives are for the 'Generate Index' VSCode Extension (jayfong.generate-index)
//  once the 'Generate Index' extension is installed,
//  open the command palette with Command+Shift+P / Ctrl+Shift+P,
//  then search for & select 'Generate Index'

// EXPORT FRAGMENTS
// @index('./!(*.spec).ts', (f, _) => `import { default as ${_.camelCase(f.name)} } from '${f.path}.js';`)
import { default as content } from './content.js';
import { default as navigationItem } from './navigationItem.js';
// @endindex

export type FragmentKey =
	// NOTE: @index directives are for the 'Generate Index' VSCode Extension (jayfong.generate-index)
	//  once the 'Generate Index' extension is installed,
	//  open the command palette with Command+Shift+P / Ctrl+Shift+P,
	//  then search for & select 'Generate Index'

	// @index('./!(*.spec|test).ts', (f, _, e) => `| '${_.constantCase(f.name)}'${e.isLast ? ';' : ''}`)
	'CONTENT' | 'NAVIGATION_ITEM';
// @endindex

const fragments: Record<FragmentKey, string> = {
	// @index('./!(*.spec|test).ts', (f, _) => `${_.constantCase(f.name)}: ${f.name},`)
	CONTENT: content,
	NAVIGATION_ITEM: navigationItem
	// @endindex
};

export default fragments;
