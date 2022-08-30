import formatCartResponse from './formatCartResponse';
import cartFromGql from './cartFromGql';
import { cartWithoutLine, shopifyErrors } from '../../__tests__/mocks';

describe('formatCartResponse', () => {
  it('returns the correct values based on inputs', () => {
    expect(
      formatCartResponse({
        cart: cartWithoutLine,
        userErrors: [],
        errors: []
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
        errors: [shopifyErrors.cartIdNotValid('123')]
      })
    ).toMatchObject({
      cart: null,
      userErrors: [{ message: 'error message ' }],
      errors: [shopifyErrors.cartIdNotValid('123')]
    });
  });
});
