// NOTE: @index directives are for the 'Generate Index' VSCode Extension (jayfong.generate-index)
//  once the 'Generate Index' extension is installed,
//  open the command palette with Command+Shift+P / Ctrl+Shift+P,
//  then search for & select 'Generate Index'

// EXPORT FRAGMENTS
// @index('./!(*.spec).ts', (f, _) => `import { default as ${_.camelCase(f.name)} } from '${f.path}.js';`)
import { default as collectionContent } from './collectionContent.js';
import { default as content } from './content.js';
import { default as media } from './media.js';
import { default as metafield } from './metafield.js';
import { default as navigationItem } from './navigationItem.js';
import { default as product } from './product.js';
import { default as productContent } from './productContent.js';
import { default as productOption } from './productOption.js';
import { default as productPriceBreak } from './productPriceBreak.js';
import { default as productPriceRule } from './productPriceRule.js';
import { default as seo } from './seo.js';
import { default as variant } from './variant.js';
import { default as variantContent } from './variantContent.js';
// @endindex

export type FragmentKey =
	// NOTE: @index directives are for the 'Generate Index' VSCode Extension (jayfong.generate-index)
	//  once the 'Generate Index' extension is installed,
	//  open the command palette with Command+Shift+P / Ctrl+Shift+P,
	//  then search for & select 'Generate Index'

	// @index('./!(*.spec|test).ts', (f, _, e) => `| '${_.constantCase(f.name)}'${e.isLast ? ';' : ''}`)
	| 'COLLECTION_CONTENT'
	| 'CONTENT'
	| 'MEDIA'
	| 'METAFIELD'
	| 'NAVIGATION_ITEM'
	| 'PRODUCT'
	| 'PRODUCT_CONTENT'
	| 'PRODUCT_OPTION'
	| 'PRODUCT_PRICE_BREAK'
	| 'PRODUCT_PRICE_RULE'
	| 'SEO'
	| 'VARIANT'
	| 'VARIANT_CONTENT';
// @endindex

const fragments: Record<FragmentKey, string> = {
	// @index('./!(*.spec|test).ts', (f, _) => `${_.constantCase(f.name)}: ${f.name},`)
	COLLECTION_CONTENT: collectionContent,
	CONTENT: content,
	MEDIA: media,
	METAFIELD: metafield,
	NAVIGATION_ITEM: navigationItem,
	PRODUCT: product,
	PRODUCT_CONTENT: productContent,
	PRODUCT_OPTION: productOption,
	PRODUCT_PRICE_BREAK: productPriceBreak,
	PRODUCT_PRICE_RULE: productPriceRule,
	SEO: seo,
	VARIANT: variant,
	VARIANT_CONTENT: variantContent
	// @endindex
};

export default fragments;
