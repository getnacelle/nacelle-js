/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchClient from 'cross-fetch';
import {
  CartCreateMutation,
  CountryCode,
  LanguageCode
} from '../../types/shopify.type';
import { createGqlClient } from '../../utils';
import formatCartResponse from '../../utils/formatCartResponse';
import { mockJsonResponse } from '../../../__tests__/utils';
import {
  clientSettings,
  responses,
  graphqlEndpoint,
  headers
} from '../../../__tests__/mocks';
import cartCreate from '../../client/actions/cartCreate';
import mutations from '../../graphql/mutations';

jest.mock('cross-fetch');
jest.mock('../../utils/formatCartResponse');

const gqlClient = createGqlClient({ ...clientSettings, fetchClient });
const mockedFetchClient = jest.mocked(fetchClient, true);
const mockedFormatCartResponse = jest.mocked(formatCartResponse, true);
const defaultLanguage: LanguageCode = 'EN';
const defaultCountry: CountryCode = 'ZZ';

describe('cartCreate', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('make a request with the expected query and variables when params empty', async () => {
    mockedFetchClient.mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<CartCreateMutation>(
          responses.mutations.cartCreate.withoutLine
        )
    );

    await cartCreate({
      gqlClient,
      language: defaultLanguage,
      country: defaultCountry
    });

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_CREATE(),
        variables: {
          input: {},
          language: defaultLanguage,
          country: defaultCountry
        }
      })
    });
  });

  it('make a request with the expected query and variables', async () => {
    mockedFetchClient.mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<CartCreateMutation>(
          responses.mutations.cartCreate.withoutLine
        )
    );

    await cartCreate({
      gqlClient,
      params: { lines: [] },
      language: defaultLanguage,
      country: defaultCountry
    });

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_CREATE(),
        variables: {
          input: { lines: [] },
          language: defaultLanguage,
          country: defaultCountry
        }
      })
    });

    expect(mockedFormatCartResponse).toHaveBeenCalledTimes(1);
    expect(mockedFormatCartResponse).toHaveBeenCalledWith({
      cart: responses.mutations.cartCreate.withoutLine.data?.cartCreate?.cart,
      userErrors:
        responses.mutations.cartCreate.withoutLine.data?.cartCreate?.userErrors,
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
      cartCreate({
        gqlClient,
        params: { lines: [] },
        language: defaultLanguage,
        country: defaultCountry
      })
    ).rejects.toThrow(networkErrorMessage);
  });
});
