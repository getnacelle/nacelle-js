import formatCartResponse from './formatCartResponse';
import cartFromGql from './cartFromGql';
import { cartWithoutLine, shopifyErrors } from '../../__tests__/mocks';

describe('formatCartResponse', () => {
  it('returns the correct values based on inputs', () => {
    expect(
      formatCartResponse({
        cart: cartWithoutLine,
        userErrors: [],
        errors: [],
        shopifyShopId: 'shop-id',
        locale: 'en-US'
      })
    ).toMatchObject({
      cart: cartFromGql({
        cart: cartWithoutLine,
        shopifyShopId: 'shop-id',
        locale: 'en-US'
      }),
      userErrors: null,
      errors: null
    });

    expect(
      formatCartResponse({
        cart: cartWithoutLine,
        userErrors: [],
        errors: [],
        shopifyShopId: 'shop-id',
        locale: 'fr-FR'
      })
    ).toMatchObject({
      cart: cartFromGql({
        cart: cartWithoutLine,
        shopifyShopId: 'shop-id',
        locale: 'fr-FR'
      }),
      userErrors: null,
      errors: null
    });

    expect(
      formatCartResponse({
        cart: null,
        userErrors: [{ message: 'error message ' }],
        errors: [shopifyErrors.cartIdNotValid('123')],
        shopifyShopId: 'shop-id',
        locale: 'en-US'
      })
    ).toMatchObject({
      cart: null,
      userErrors: [{ message: 'error message ' }],
      errors: [shopifyErrors.cartIdNotValid('123')]
    });
  });
});
