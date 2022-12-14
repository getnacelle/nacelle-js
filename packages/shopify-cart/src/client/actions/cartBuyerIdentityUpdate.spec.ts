/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchClient from 'cross-fetch';
import {
  CartBuyerIdentityUpdateMutation,
  CountryCode,
  LanguageCode
} from '../../types/shopify.type';
import { createGqlClient } from '../../utils';
import formatCartResponse from '../../utils/formatCartResponse';
import { mockJsonResponse } from '../../../__tests__/utils';
import {
  clientSettings,
  cartId,
  responses,
  graphqlEndpoint,
  headers
} from '../../../__tests__/mocks';
import cartBuyerIdentityUpdate from './cartBuyerIdentityUpdate';
import mutations from '../../graphql/mutations';

jest.mock('cross-fetch');
jest.mock('../../utils/formatCartResponse');

const gqlClient = createGqlClient({ ...clientSettings, fetchClient });
const mockedFetchClient = jest.mocked(fetchClient, true);
const mockedFormatCartResponse = jest.mocked(formatCartResponse, true);
const defaultLanguage: LanguageCode = 'EN';
const defaultCountry: CountryCode = 'ZZ';
const defaultLocale = 'en-US';
const defaultShopId = 'shop-id';

describe('cartBuyerIdentityUpdate', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('make a request with the expected query and variables', async () => {
    mockedFetchClient.mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<CartBuyerIdentityUpdateMutation>(
          responses.mutations.cartBuyerIdentityUpdate.withoutBuyer
        )
    );

    await cartBuyerIdentityUpdate({
      gqlClient,
      cartId,
      buyerIdentity: {
        email: 'email@email.com'
      },
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

    expect(mockedFormatCartResponse).toHaveBeenCalledTimes(1);
    expect(mockedFormatCartResponse).toHaveBeenCalledWith({
      cart: responses.mutations.cartBuyerIdentityUpdate.withoutBuyer.data
        ?.cartBuyerIdentityUpdate?.cart,
      userErrors:
        responses.mutations.cartBuyerIdentityUpdate.withoutBuyer.data
          ?.cartBuyerIdentityUpdate?.userErrors,
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
      cartBuyerIdentityUpdate({
        gqlClient,
        cartId,
        buyerIdentity: {
          email: 'email@email.com'
        },
        language: defaultLanguage,
        country: defaultCountry,
        locale: defaultLocale,
        shopifyShopId: defaultShopId
      })
    ).rejects.toThrow(networkErrorMessage);
  });
});
