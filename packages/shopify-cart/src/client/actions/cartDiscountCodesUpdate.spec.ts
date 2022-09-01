/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchClient from 'cross-fetch';
import { CartDiscountCodesUpdateMutation } from '../../types/shopify.type';
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
import cartDiscountCodesUpdate from './cartDiscountCodesUpdate';
import mutations from '../../graphql/mutations';

jest.mock('cross-fetch');
jest.mock('../../utils/formatCartResponse');

const gqlClient = createGqlClient({ ...clientSettings, fetchClient });
const mockedFetchClient = jest.mocked(fetchClient, true);
const mockedFormatCartResponse = jest.mocked(formatCartResponse, true);

describe('cartDiscountCodesUpdate', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('make a request with the expected query and variables', async () => {
    mockedFetchClient.mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<CartDiscountCodesUpdateMutation>(
          responses.mutations.cartDiscountCodesUpdate.withoutCodes
        )
    );

    await cartDiscountCodesUpdate({
      gqlClient,
      cartId,
      discountCodes: ['code']
    });

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_DISCOUNT_CODES_UPDATE(),
        variables: {
          cartId,
          discountCodes: ['code']
        }
      })
    });

    expect(mockedFormatCartResponse).toHaveBeenCalledTimes(1);
    expect(mockedFormatCartResponse).toHaveBeenCalledWith({
      cart: responses.mutations.cartDiscountCodesUpdate.withoutCodes.data
        ?.cartDiscountCodesUpdate?.cart,
      userErrors:
        responses.mutations.cartDiscountCodesUpdate.withoutCodes.data
          ?.cartDiscountCodesUpdate?.userErrors,
      errors: undefined
    });
  });

  // Test Thrown Handling
  it('throws an error if there are problems with the request', async () => {
    const networkErrorMessage = 'Network error!';
    mockedFetchClient.mockImplementation(
      (): Promise<any> => Promise.reject(networkErrorMessage)
    );

    expect.assertions(1);
    await expect(
      cartDiscountCodesUpdate({
        gqlClient,
        cartId,
        discountCodes: ['code']
      })
    ).rejects.toThrow(networkErrorMessage);
  });
});
