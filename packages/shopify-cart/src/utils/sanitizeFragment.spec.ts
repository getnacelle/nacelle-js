import sanitizeFragment from './sanitizeFragment';

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
