// NOTE: @index directives are for the 'Generate Index' VSCode Extension (jayfong.generate-index)
//  once the 'Generate Index' extension is installed,
//  open the command palette with Command+Shift+P / Ctrl+Shift+P,
//  then search for & select 'Generate Index'

// EXPORT FRAGMENTS
// @index('./!(*.spec).ts', (f, _) => `import { default as ${_.camelCase(f.name)} } from '${f.path}';`)
import { default as buyerIdentity } from './buyerIdentity';
import { default as cart } from './cart';
import { default as discountAllocation } from './discountAllocation';
import { default as extendCart } from './extendCart';
import { default as extendCartLine } from './extendCartLine';
import { default as merchandise } from './merchandise';
import { default as money } from './money';
import { default as userErrors } from './userErrors';
// @endindex

export type CustomFragmentKey =
  // NOTE: @index directives are for the 'Generate Index' VSCode Extension (jayfong.generate-index)
  //  once the 'Generate Index' extension is installed,
  //  open the command palette with Command+Shift+P / Ctrl+Shift+P,
  //  then search for & select 'Generate Index'

  // @index('./!(*.spec|cart).ts', (f, _, e) => `| '${_.constantCase(f.name)}'${e.isLast ? ';' : ''}`)
  | 'BUYER_IDENTITY'
  | 'DISCOUNT_ALLOCATION'
  | 'EXTEND_CART'
  | 'EXTEND_CART_LINE'
  | 'MERCHANDISE'
  | 'MONEY'
  | 'USER_ERRORS';
// @endindex

export type CustomFragments = Partial<Record<CustomFragmentKey, string>>;

export const customFragmentKeys: Set<CustomFragmentKey> = new Set([
  // @index('./!(*.spec|cart).ts', (f, _) => `'${_.constantCase(f.name)}',`)
  'BUYER_IDENTITY',
  'DISCOUNT_ALLOCATION',
  'EXTEND_CART',
  'EXTEND_CART_LINE',
  'MERCHANDISE',
  'MONEY',
  'USER_ERRORS'
  // @endindex
]);

type FragmentKey = CustomFragmentKey | 'CART';
type Fragment = (customFragments?: CustomFragments) => string;

const fragments: Record<FragmentKey, Fragment> = {
  // @index('./!(*.spec).ts', (f, _) => `${_.constantCase(f.name)}: ${f.name},`)
  BUYER_IDENTITY: buyerIdentity,
  CART: cart,
  DISCOUNT_ALLOCATION: discountAllocation,
  EXTEND_CART: extendCart,
  EXTEND_CART_LINE: extendCartLine,
  MERCHANDISE: merchandise,
  MONEY: money,
  USER_ERRORS: userErrors
  // @endindex
};

export default fragments;
