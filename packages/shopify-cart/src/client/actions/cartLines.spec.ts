/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchClient from 'cross-fetch';
import { createGqlClient } from '../../utils';
import formatCartResponse from '../../utils/formatCartResponse';
import {
  cartLinesAdd,
  cartLinesRemove,
  cartLinesUpdate
} from '../../client/actions';
import mutations from '../../graphql/mutations';
import { mockJsonResponse } from '../../../__tests__/utils';
import {
  clientSettings,
  cartId,
  cartWithLineResponse,
  responses,
  graphqlEndpoint,
  headers
} from '../../../__tests__/mocks';
import { CountryCode, LanguageCode } from '../../types/shopify.type';
import type {
  CartLineAddMutation,
  CartLineRemoveMutation,
  CartLineUpdateMutation
} from '../../types/shopify.type';

jest.mock('cross-fetch');
jest.mock('../../utils/formatCartResponse');

const gqlClient = createGqlClient({ ...clientSettings, fetchClient });
const mockedFetchClient = jest.mocked(fetchClient, true);
const mockedFormatCartResponse = jest.mocked(formatCartResponse, true);
const defaultLanguage: LanguageCode = 'EN';
const defaultCountry: CountryCode = 'ZZ';
const defaultLocale = 'en-US';
const defaultShopId = 'shop-id';
const defaultEntryId =
  'aWQ6Ly9TSE9QSUZZL3Rlc3QvZGVmYXVsdC9QUk9EVUNUX1ZBUklBTlQvMDAwMC9lbi1VUw==';

describe('cartLinesAdd', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('make a request with the expected query and variables', async () => {
    mockedFetchClient.mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<CartLineAddMutation>(responses.mutations.cartLinesAdd)
    );

    await cartLinesAdd({
      gqlClient,
      cartId,
      lines: [
        {
          nacelleEntryId: defaultEntryId
        }
      ],
      shopifyShopId: defaultShopId,
      language: defaultLanguage,
      country: defaultCountry,
      locale: defaultLocale
    });

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_LINE_ADD(),
        variables: {
          cartId,
          lines: [
            {
              merchandiseId:
                cartWithLineResponse.cart.lines.nodes[0].merchandise
                  .sourceEntryId
            }
          ],
          language: defaultLanguage,
          country: defaultCountry
        }
      })
    });

    expect(mockedFormatCartResponse).toHaveBeenCalledTimes(1);
    expect(mockedFormatCartResponse).toHaveBeenCalledWith({
      cart: responses.mutations.cartLinesAdd.data?.cartLinesAdd?.cart,
      userErrors:
        responses.mutations.cartLinesAdd.data?.cartLinesAdd?.userErrors,
      errors: undefined,
      locale: defaultLocale,
      shopifyShopId: defaultShopId
    });
  });

  // Test Thrown Error
  it('throws an error if there are problems with the request', async () => {
    const networkErrorMessage = 'Network error!';
    mockedFetchClient.mockImplementation(
      (): Promise<any> => Promise.reject(networkErrorMessage)
    );

    expect.assertions(1);
    await expect(
      cartLinesAdd({
        gqlClient,
        cartId,
        lines: [
          {
            nacelleEntryId: defaultEntryId
          }
        ],
        shopifyShopId: defaultShopId,
        language: defaultLanguage,
        country: defaultCountry,
        locale: defaultLocale
      })
    ).rejects.toThrow(networkErrorMessage);
  });
});

describe('cartLinesUpdate', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('make a request with the expected query and variables', async () => {
    mockedFetchClient.mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<CartLineUpdateMutation>(
          responses.mutations.cartLinesUpdate
        )
    );

    const updatedCart = cartWithLineResponse;
    updatedCart.cart.lines.nodes[0].quantity = 2;

    await cartLinesUpdate({
      gqlClient,
      cartId,
      lines: [
        {
          quantity: 2,
          nacelleEntryId: defaultEntryId,
          id: updatedCart.cart.lines.nodes[0].id
        }
      ],
      shopifyShopId: defaultShopId,
      language: defaultLanguage,
      country: defaultCountry,
      locale: defaultLocale
    });

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
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

    expect(mockedFormatCartResponse).toHaveBeenCalledTimes(1);
    expect(mockedFormatCartResponse).toHaveBeenCalledWith({
      cart: responses.mutations.cartLinesUpdate.data?.cartLinesUpdate?.cart,
      userErrors:
        responses.mutations.cartLinesUpdate.data?.cartLinesUpdate?.userErrors,
      errors: undefined,
      locale: defaultLocale,
      shopifyShopId: defaultShopId
    });
  });

  // Test Thrown Error
  it('throws an error if there are problems with the request', async () => {
    const networkErrorMessage = 'Network error!';
    mockedFetchClient.mockImplementation(
      (): Promise<any> => Promise.reject(networkErrorMessage)
    );

    expect.assertions(1);
    await expect(
      cartLinesUpdate({
        gqlClient,
        cartId,
        lines: [
          {
            id: cartWithLineResponse.cart.lines.nodes[0].id,
            nacelleEntryId: defaultEntryId,
            quantity: 2
          }
        ],
        shopifyShopId: defaultShopId,
        language: defaultLanguage,
        country: defaultCountry,
        locale: defaultLocale
      })
    ).rejects.toThrow(networkErrorMessage);
  });
});

describe('cartLinesRemove', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('make a request with the expected query and variables', async () => {
    mockedFetchClient.mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<CartLineRemoveMutation>(
          responses.mutations.cartLinesRemove
        )
    );

    await cartLinesRemove({
      gqlClient,
      cartId,
      lineIds: [cartWithLineResponse.cart.lines.nodes[0].id],
      shopifyShopId: defaultShopId,
      language: defaultLanguage,
      country: defaultCountry,
      locale: defaultLocale
    });

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
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

    expect(mockedFormatCartResponse).toHaveBeenCalledTimes(1);
    expect(mockedFormatCartResponse).toHaveBeenCalledWith({
      cart: responses.mutations.cartLinesRemove.data?.cartLinesRemove?.cart,
      userErrors:
        responses.mutations.cartLinesRemove.data?.cartLinesRemove?.userErrors,
      errors: undefined,
      locale: defaultLocale,
      shopifyShopId: defaultShopId
    });
  });

  // Test Thrown Error
  it('throws an error if there are problems with the request', async () => {
    const networkErrorMessage = 'Network error!';
    mockedFetchClient.mockImplementation(
      (): Promise<any> => Promise.reject(networkErrorMessage)
    );

    expect.assertions(1);
    await expect(
      cartLinesRemove({
        gqlClient,
        cartId,
        lineIds: [cartWithLineResponse.cart.lines.nodes[0].id],
        shopifyShopId: defaultShopId,
        language: defaultLanguage,
        country: defaultCountry,
        locale: defaultLocale
      })
    ).rejects.toThrow(networkErrorMessage);
  });
});
