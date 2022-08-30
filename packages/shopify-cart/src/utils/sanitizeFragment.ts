import fragments from '../graphql/fragments';
import type { UserSuppliedFragmentType } from '../client';

/**
 * Enforce that user-supplied fragments have predictable fragment names and use the expected GraphQL types.
 * @param fragment user-supplied GraphQL fragment that could have an arbitrary fragment name.
 * @param fragmentType the fragment type/key.
 * @returns a modified version of the fragment, where the fragment's name is `fragmentName`.
 * @example
 * We need a user-supplied `MoneyV2` fragment to have a fragment name of `Money_money`, so that we can use it elsewhere.
 * ```
 * const moneyFragment = `
 *  fragment Custom_money on MoneyV2 {
 *    currencyCode
 *    amount
 *  }
 * `;
 *
 * // Result: '\n  fragment Money_money on MoneyV2 {\n    currencyCode\n    amount\n  }\n'
 * sanitizeFragment(moneyFragment, 'MONEY');
 * ```
 */
export default function sanitizeFragment(
  fragment: string,
  fragmentType: UserSuppliedFragmentType
): string {
  // In this regex, we use four capture groups:
  // - `$1` captures `fragment `.
  // - `$2` captures the fragment name.
  // - `$3` captures ` on `.
  // - `$4` captures the GraphQL type.
  const regexp = /(fragment )(\w+)( on )(\w+)/;

  // First, determine what the expected fragment name and GraphQL type are.
  const defaultFragmentResult = regexp.exec(fragments[fragmentType]());
  const expectedFragmentName = (defaultFragmentResult as RegExpExecArray)[2];
  const expectedOnType = (defaultFragmentResult as RegExpExecArray)[4];

  // Next, determine if there are any discrepancies between the supplied & expected GraphQL types.
  const suppliedFragmentResult = regexp.exec(fragment);
  const suppliedOnType = (suppliedFragmentResult as RegExpExecArray)[4];

  if (suppliedOnType !== expectedOnType) {
    throw new Error(
      `${fragmentType} fragment expected to be on GraphQL type '${expectedOnType}', but received '${suppliedOnType}'.`
    );
  }

  // Replace the supplied fragment name with our default fragment name.
  return fragment.replace(regexp, `$1${expectedFragmentName}$3$4`);
}
