import formatCartResponse from './formatCartResponse';
import cartFromGql from './cartFromGql';
import { cartWithoutLine } from '../../__tests__/mocks';

describe('formatCartResponse', () => {
  it('returns the correct values based on inputs', () => {
    expect(
      formatCartResponse({
        cart: cartWithoutLine,
        userErrors: [],
        errors: null
      })
    ).toMatchObject({
      cart: cartFromGql({ cart: cartWithoutLine }),
      userErrors: null,
      errors: null
    });

    expect(
      formatCartResponse({
        cart: null,
        userErrors: [{ message: 'error message ' }],
        errors: null
      })
    ).toMatchObject({
      cart: null,
      userErrors: [{ message: 'error message ' }],
      errors: null
    });
  });
});
