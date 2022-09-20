/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchClient from 'cross-fetch';
import {
  Cart_CartFragment,
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
import cart from './cart';
import queries from '../../graphql/queries';

jest.mock('cross-fetch');
jest.mock('../../utils/formatCartResponse');

const gqlClient = createGqlClient({ ...clientSettings, fetchClient });
const mockedFetchClient = jest.mocked(fetchClient, true);
const mockedFormatCartResponse = jest.mocked(formatCartResponse, true);
const defaultLanguage: LanguageCode = 'EN';
const defaultCountry: CountryCode = 'ZZ';
const defaultLocale = 'en-US';
const defaultShopId = 'shop-id';

describe('fetch cart', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('make a request with the expected query and variables', async () => {
    mockedFetchClient.mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<{ cart: Cart_CartFragment }>(responses.queries.cart)
    );

    await cart({
      gqlClient,
      cartId,
      language: defaultLanguage,
      country: defaultCountry,
      locale: defaultLocale,
      shopifyShopId: defaultShopId
    });

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
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

    expect(mockedFormatCartResponse).toHaveBeenCalledTimes(1);
    expect(mockedFormatCartResponse).toHaveBeenCalledWith({
      cart: responses.queries.cart.data?.cart,
      userErrors: null,
      errors: undefined
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
      cart({
        gqlClient,
        cartId,
        language: defaultLanguage,
        country: defaultCountry,
        locale: defaultLocale,
        shopifyShopId: defaultShopId
      })
    ).rejects.toThrow(networkErrorMessage);
  });
});
