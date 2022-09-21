import sanitizeFragments, { sanitizeFragment } from './sanitizeFragments';
import type { CustomFragments } from '../graphql/fragments';

describe('sanitizeFragment', () => {
  it("changes the fragment name to the corresponding default fragment's name", () => {
    const fragment = `
      fragment Cost on MoneyV2 {
        currencyCode
        amount
      }
    `;
    expect(sanitizeFragment(fragment, 'MONEY')).toMatch(
      'fragment Money_money on MoneyV2'
    );
  });

  it("throws an informative error when the provided GraphQL type doesn't match the expected GraphQL type", () => {
    const fragment = `
      fragment Money_money on Cash {
        currencyCode
        amount
      }
    `;
    expect(() => sanitizeFragment(fragment, 'MONEY')).toThrow(
      `MONEY fragment expected to be on GraphQL type 'MoneyV2', but received 'Cash'.`
    );
  });
});

describe('sanitizeFragments', () => {
  it('returns `undefined` if `customFragments` is `undefined`', () => {
    expect(sanitizeFragments()).toBe(undefined);
  });

  it('sanitizes all fragments passed to it', () => {
    const customFragments: CustomFragments = {
      MONEY: `
        fragment Cost on MoneyV2 {
          amount
        }
      `
    };
    expect(sanitizeFragments(customFragments)).toStrictEqual({
      MONEY: expect.stringMatching('fragment Money_money on MoneyV2')
    });
  });

  it('throws an error when the provided `customFragments` are not provided as an object', () => {
    expect(() =>
      sanitizeFragments([
        `
          fragment Cost on MoneyV2 {
            amount
          }
        `,
        `
          fragment Picture on Image {
            url
            altText
          }
        `
      ] as CustomFragments)
    ).toThrow(
      "`customFragments` must be an object. Please refer to `@nacelle/shopify-cart`'s README."
    );
  });

  it('throws an error when the provided `customFragments` contain an invalid fragment key', () => {
    const customFragments = {
      MONEY: `
        fragment Cost on MoneyV2 {
          amount
        }
      `,
      NURCHENDICE: `
        fragment Merchandise_merchandise on ProductVariant {
          availableForSale
        }
      `
    };

    expect(() => sanitizeFragments(customFragments)).toThrow(
      "Invalid custom fragment 'NURCHENDICE' provided."
    );
  });
});
