/* eslint-disable @typescript-eslint/no-explicit-any */
import createShopifyCartClient from './index';
import mutations from '../graphql/mutations';
import { mockJsonResponse } from '../../__tests__/utils';
import {
  clientSettings,
  responses,
  graphqlEndpoint,
  headers,
  cartId,
  cartWithLineResponse
} from '../../__tests__/mocks';
import queries from '../graphql/queries';
import type {
  CartAttributesUpdateMutation,
  CartBuyerIdentityUpdateMutation,
  CartCreateMutation,
  CartDiscountCodesUpdateMutation,
  CartLineAddMutation,
  CartLineUpdateMutation,
  CartLineRemoveMutation,
  CartNoteUpdateMutation,
  Cart_CartFragment,
  LanguageCode,
  CountryCode
} from '../types/shopify.type';

const defaultLanguage: LanguageCode = 'EN';
const defaultCountry: CountryCode = 'ZZ';
const defaultLocale = 'en-US';

describe('createShopifyCartClient', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('creates a client containing the expected functions', () => {
    const cartClient = createShopifyCartClient(clientSettings);
    expect(cartClient).toBeInstanceOf(Object);
    expect(cartClient.cart).toBeInstanceOf(Function);
    expect(cartClient.cartCreate).toBeInstanceOf(Function);
    expect(cartClient.cartDiscountCodesUpdate).toBeInstanceOf(Function);
    expect(cartClient.cartLinesAdd).toBeInstanceOf(Function);
    expect(cartClient.cartLinesUpdate).toBeInstanceOf(Function);
    expect(cartClient.cartLinesRemove).toBeInstanceOf(Function);
    expect(cartClient.cartBuyerIdentityUpdate).toBeInstanceOf(Function);
    expect(cartClient.cartAttributesUpdate).toBeInstanceOf(Function);
    expect(cartClient.cartNoteUpdate).toBeInstanceOf(Function);
  });

  it("uses `window.fetch` when `typeof window !== 'undefined'` and an isomorphic fetch client hasn't been supplied", async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartCreateMutation>(
          responses.mutations.cartCreate.withLine
        )
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);
    const note = 'hi!';
    await cartClient.cartCreate({ note });

    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_CREATE(),
        variables: {
          input: { note },
          language: defaultLanguage,
          country: defaultCountry
        }
      })
    });
  });

  it('makes the expected request when fetching cart', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<{ cart: Cart_CartFragment }>(responses.queries.cart)
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);

    await cartClient.cart({ cartId });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: queries.CART(),
        variables: {
          id: cartId,
          language: defaultLanguage,
          country: defaultCountry
        }
      })
    });
  });

  it('makes a request with provided language when language is passed to createCart', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<{ cart: Cart_CartFragment }>(responses.queries.cart)
    );
    window.fetch = windowFetch;
    const cartClient = createShopifyCartClient({
      ...clientSettings,
      language: 'FR'
    });
    await cartClient.cart({ cartId });
    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: queries.CART(),
        variables: {
          id: cartId,
          language: 'FR',
          country: defaultCountry
        }
      })
    });
  });

  it('makes a request with provided country when country is passed to createCart', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<{ cart: Cart_CartFragment }>(responses.queries.cart)
    );
    window.fetch = windowFetch;
    const cartClient = createShopifyCartClient({
      ...clientSettings,
      country: 'US'
    });
    await cartClient.cart({ cartId });
    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: queries.CART(),
        variables: {
          id: cartId,
          language: defaultLanguage,
          country: 'US'
        }
      })
    });
  });
  it('makes the expected request when adding line item to cart', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartLineAddMutation>(responses.mutations.cartLinesAdd)
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);

    await cartClient.cartLinesAdd({
      cartId,
      lines: []
    });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_LINE_ADD(),
        variables: {
          cartId,
          lines: [],
          language: defaultLanguage,
          country: defaultCountry
        }
      })
    });
  });

  it('makes the expected request when updating line item in cart', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartLineUpdateMutation>(
          responses.mutations.cartLinesUpdate
        )
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);
    const updatedCart = cartWithLineResponse;
    updatedCart.cart.lines.nodes[0].quantity = 2;

    await cartClient.cartLinesUpdate({
      cartId,
      lines: [
        {
          quantity: 2,
          id: updatedCart.cart.lines.nodes[0].id,
          nacelleEntryId: updatedCart.cart.lines.nodes[0].attributes[0]
            .value as string
        }
      ]
    });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_LINE_UPDATE(),
        variables: {
          cartId,
          lines: [
            {
              quantity: 2,
              id: updatedCart.cart.lines.nodes[0].id,
              merchandiseId:
                updatedCart.cart.lines.nodes[0].merchandise.sourceEntryId
            }
          ],
          language: defaultLanguage,
          country: defaultCountry
        }
      })
    });
  });

  it('makes the expected request when removing line item from cart', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartLineRemoveMutation>(
          responses.mutations.cartLinesRemove
        )
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);

    await cartClient.cartLinesRemove({
      cartId,
      lineIds: [cartWithLineResponse.cart.lines.nodes[0].id]
    });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_LINE_REMOVE(),
        variables: {
          cartId,
          lineIds: [cartWithLineResponse.cart.lines.nodes[0].id],
          language: defaultLanguage,
          country: defaultCountry
        }
      })
    });
  });

  it('makes the expected request when update buyer on cart', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartBuyerIdentityUpdateMutation>(
          responses.mutations.cartBuyerIdentityUpdate.withoutBuyer
        )
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);

    await cartClient.cartBuyerIdentityUpdate({
      cartId,
      buyerIdentity: {
        email: 'email@email.com'
      }
    });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_BUYER_IDENTITY_UPDATE(),
        variables: {
          cartId,
          buyerIdentity: {
            email: 'email@email.com'
          },
          language: defaultLanguage,
          country: defaultCountry
        }
      })
    });
  });

  it('makes the expected request when updating discounts on cart', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartDiscountCodesUpdateMutation>(
          responses.mutations.cartDiscountCodesUpdate.withoutCodes
        )
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);

    await cartClient.cartDiscountCodesUpdate({
      cartId,
      discountCodes: ['code']
    });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_DISCOUNT_CODES_UPDATE(),
        variables: {
          cartId,
          discountCodes: ['code'],
          language: defaultLanguage,
          country: defaultCountry
        }
      })
    });
  });

  it('makes the expected request when updating a note on the cart', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartNoteUpdateMutation>(
          responses.mutations.cartNoteUpdate.noNote
        )
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);
    const note = 'Cart Note';
    await cartClient.cartNoteUpdate({ cartId, note });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_NOTE_UPDATE(),
        variables: {
          cartId,
          note,
          language: defaultLanguage,
          country: defaultCountry
        }
      })
    });
  });

  it('makes the expected request when updating attributes on a cart', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartAttributesUpdateMutation>(
          responses.mutations.cartAttributesUpdate.noAttributes
        )
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);
    const attributes = [{ key: 'testKey', value: 'testValue' }];

    await cartClient.cartAttributesUpdate({ cartId, attributes });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_ATTRIBUTES_UPDATE(),
        variables: {
          cartId,
          attributes,
          language: defaultLanguage,
          country: defaultCountry
        }
      })
    });
  });

  it('makes requests using user-supplied `customFragments`', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartCreateMutation>(
          responses.mutations.cartCreate.withLine
        )
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient({
      ...clientSettings,
      customFragments: {
        BUYER_IDENTITY: `
          fragment CartBuyerIdentity_buyerIdentity on CartBuyerIdentity {
            email
            phone
          }
        `,
        DISCOUNT_ALLOCATION: `
          fragment CartDiscountAllocation_discountAllocation on CartDiscountAllocation {
            discountedAmount {
              amount
              currencyCode
            }
          }
        `,
        MERCHANDISE: `
          fragment Merchandise_merchandise on ProductVariant {
            available: availableForSale
          }
        `,
        MONEY: `
          fragment Money_money on MoneyV2 {
            cost: amount
          }
        `,
        USER_ERRORS: `
          fragment CartUserError_userErrors on CartUserError {
            message
          }
        `
      }
    });

    await cartClient.cartCreate({ lines: [] });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    const requestBody = (windowFetch.mock.calls[0] as Request[])[1].body;

    // BUYER_IDENTITY
    expect(requestBody).toMatch(
      /fragment CartBuyerIdentity_buyerIdentity on CartBuyerIdentity {\\n\s+ email\\n\s+ phone\\n\s+ }/
    );

    // DISCOUNT_ALLOCATION
    expect(requestBody).toMatch(
      /fragment CartDiscountAllocation_discountAllocation on CartDiscountAllocation {\\n\s+ discountedAmount {\\n\s+ amount\\n\s+ currencyCode\\n\s+ }\\n\s+ }/
    );

    // MERCHANDISE
    expect(requestBody).toMatch(
      /fragment Merchandise_merchandise on ProductVariant {\\n\s+ available: availableForSale\\n\s+ }/
    );

    // MONEY
    expect(requestBody).toMatch(
      /fragment Money_money on MoneyV2 {\\n\s+ cost: amount\\n\s+ }/
    );

    // USER_ERRORS
    expect(requestBody).toMatch(
      /fragment CartUserError_userErrors on CartUserError {\\n\s+ message\\n\s+ }/
    );
  });

  it('makes requests using `EXTEND_`-type user-supplied `customFragments`', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<{ cart: Cart_CartFragment }>(responses.queries.cart)
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient({
      ...clientSettings,
      customFragments: {
        EXTEND_CART: `
          fragment Cart_extendCart on Cart {
            deliveryGroups(first: 1) {
              nodes {
                deliveryOptions {
                  code
                }
              }
            }
          }
        `,
        EXTEND_CART_LINE: `
          fragment CartLine_extendCartLine on CartLine {
            sellingPlanAllocation {
              checkoutChargeAmount {
                amount
              }
            }
          }
        `
      }
    });

    await cartClient.cart({ cartId });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    const requestBody = (windowFetch.mock.calls[0] as Request[])[1].body;

    // EXTEND_CART
    expect(requestBody).toMatch(
      /fragment Cart_extendCart on Cart {\\n\s+ deliveryGroups\(first: 1\) {\\n\s+ nodes {\\n\s+ deliveryOptions {\\n\s+ code\\n\s+ }\\n\s+ }\\n\s+ }\\n\s+ }/
    );

    // EXTEND_CART_LINE
    expect(requestBody).toMatch(
      /fragment CartLine_extendCartLine on CartLine {\\n\s+ sellingPlanAllocation {\\n\s+ checkoutChargeAmount {\\n\s+ amount\\n\s+ }\\n\s+ }\\n\s+ }/
    );
  });

  it('returns the config options passed in when you call getConfig', () => {
    const cartClientWithNonDefaultCountryAndLanguage = createShopifyCartClient({
      ...clientSettings,
      country: 'CA',
      language: 'FR',
      locale: 'en-US'
    });
    expect(cartClientWithNonDefaultCountryAndLanguage.getConfig()).toEqual({
      ...clientSettings,
      country: 'CA',
      language: 'FR',
      locale: 'en-US'
    });
    const cartClientWithDefaultLanguageAndCountry = createShopifyCartClient({
      ...clientSettings
    });
    expect(cartClientWithDefaultLanguageAndCountry.getConfig()).toEqual({
      ...clientSettings,
      country: defaultCountry,
      language: defaultLanguage,
      locale: defaultLocale
    });
  });
  it('updates the language setting in the config if you set a new language with setConfig', () => {
    const cartClient = createShopifyCartClient({ ...clientSettings });
    cartClient.setConfig({ language: 'FR' });
    expect(cartClient.getConfig()).toEqual({
      ...clientSettings,
      country: defaultCountry,
      language: 'FR',
      locale: 'en-US'
    });
  });
  it('updates the country setting in the config if you set a new language with setConfig', () => {
    const cartClient = createShopifyCartClient({ ...clientSettings });
    cartClient.setConfig({ country: 'CA' });
    expect(cartClient.getConfig()).toEqual({
      ...clientSettings,
      language: defaultLanguage,
      country: 'CA',
      locale: 'en-US'
    });
  });
  it('uses the updated settings in the cart request if you update the config with setConfig', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<{ cart: Cart_CartFragment }>(responses.queries.cart)
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);
    cartClient.setConfig({ language: 'FR', country: 'CA' });
    await cartClient.cart({ cartId });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: queries.CART(),
        variables: {
          id: cartId,
          language: 'FR',
          country: 'CA'
        }
      })
    });
  });
  it('uses the updated client settings in the cartLinesAdd request if you update the config with setConfig', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartLineAddMutation>(responses.mutations.cartLinesAdd)
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);

    cartClient.setConfig({ language: 'FR', country: 'CA' });

    await cartClient.cartLinesAdd({
      cartId,
      lines: []
    });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_LINE_ADD(),
        variables: {
          cartId,
          lines: [],
          language: 'FR',
          country: 'CA'
        }
      })
    });
  });
  it('uses the updated client settings in the cartLinesUpdate request if you update the config with setConfig', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartLineUpdateMutation>(
          responses.mutations.cartLinesUpdate
        )
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);
    cartClient.setConfig({ language: 'FR', country: 'CA' });
    const updatedCart = cartWithLineResponse;
    updatedCart.cart.lines.nodes[0].quantity = 2;

    await cartClient.cartLinesUpdate({
      cartId,
      lines: [
        {
          quantity: 2,
          id: updatedCart.cart.lines.nodes[0].id,
          nacelleEntryId: updatedCart.cart.lines.nodes[0].attributes[0]
            .value as string
        }
      ]
    });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_LINE_UPDATE(),
        variables: {
          cartId,
          lines: [
            {
              quantity: 2,
              id: updatedCart.cart.lines.nodes[0].id,
              merchandiseId:
                updatedCart.cart.lines.nodes[0].merchandise.sourceEntryId
            }
          ],
          language: 'FR',
          country: 'CA'
        }
      })
    });
  });

  it('uses the updated client settings in the cartLinesRemove request if you update the config with setConfig', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartLineRemoveMutation>(
          responses.mutations.cartLinesRemove
        )
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);
    cartClient.setConfig({ language: 'FR', country: 'CA' });

    await cartClient.cartLinesRemove({
      cartId,
      lineIds: [cartWithLineResponse.cart.lines.nodes[0].id]
    });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_LINE_REMOVE(),
        variables: {
          cartId,
          lineIds: [cartWithLineResponse.cart.lines.nodes[0].id],
          language: 'FR',
          country: 'CA'
        }
      })
    });
  });

  it('uses the updated client settings in the CartBuyerIdentityUpdate request if you update the config with setConfig', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartBuyerIdentityUpdateMutation>(
          responses.mutations.cartBuyerIdentityUpdate.withoutBuyer
        )
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);
    cartClient.setConfig({ language: 'FR', country: 'CA' });

    await cartClient.cartBuyerIdentityUpdate({
      cartId,
      buyerIdentity: {
        email: 'email@email.com'
      }
    });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_BUYER_IDENTITY_UPDATE(),
        variables: {
          cartId,
          buyerIdentity: {
            email: 'email@email.com'
          },
          language: 'FR',
          country: 'CA'
        }
      })
    });
  });

  it('uses the updated client settings in the cartDiscountCodesUpdateMutation request if you update the config with setConfig', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartDiscountCodesUpdateMutation>(
          responses.mutations.cartDiscountCodesUpdate.withoutCodes
        )
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);
    cartClient.setConfig({ language: 'FR', country: 'CA' });

    await cartClient.cartDiscountCodesUpdate({
      cartId,
      discountCodes: ['code']
    });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_DISCOUNT_CODES_UPDATE(),
        variables: {
          cartId,
          discountCodes: ['code'],
          language: 'FR',
          country: 'CA'
        }
      })
    });
  });

  it('uses the updated client settings in the cartNoteUpdateMutation request if you update the config with setConfig', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartNoteUpdateMutation>(
          responses.mutations.cartNoteUpdate.noNote
        )
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);
    const note = 'Cart Note';
    cartClient.setConfig({ language: 'FR', country: 'CA' });

    await cartClient.cartNoteUpdate({ cartId, note });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_NOTE_UPDATE(),
        variables: {
          cartId,
          note,
          language: 'FR',
          country: 'CA'
        }
      })
    });
  });

  it('uses the updated client settings in the cartAttributesUpdate request if you update the config with setConfig', async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<CartAttributesUpdateMutation>(
          responses.mutations.cartAttributesUpdate.noAttributes
        )
    );
    window.fetch = windowFetch;

    const cartClient = createShopifyCartClient(clientSettings);
    cartClient.setConfig({ language: 'FR', country: 'CA' });

    const attributes = [{ key: 'testKey', value: 'testValue' }];

    await cartClient.cartAttributesUpdate({ cartId, attributes });

    expect(windowFetch).toHaveBeenCalledTimes(1);
    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_ATTRIBUTES_UPDATE(),
        variables: {
          cartId,
          attributes,
          language: 'FR',
          country: 'CA'
        }
      })
    });
  });
});
