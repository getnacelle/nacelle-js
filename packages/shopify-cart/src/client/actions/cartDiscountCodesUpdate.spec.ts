/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchClient from 'cross-fetch';
import { CartDiscountCodesUpdateMutation } from '../../types/shopify.type';
import { cartDiscountCodesUpdate } from '../../client/actions';
import mutations from '../../graphql/mutations';
import { createGqlClient } from '../../utils';
import { mockJsonResponse } from '../../../__tests__/utils';
import { cartDoesNotExistUserError } from '../../utils/handleShopifyError';
import {
  clientSettings,
  cartId,
  carts,
  responses,
  graphqlEndpoint,
  headers
} from '../../../__tests__/mocks';

jest.mock('cross-fetch');

const gqlClient = createGqlClient({ ...clientSettings, fetchClient });
const mockedFetchClient = jest.mocked(fetchClient, true);

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

    await expect(
      cartDiscountCodesUpdate({
        gqlClient,
        cartId,
        discountCodes: ['code']
      })
    ).resolves.toStrictEqual({
      ...carts.withoutLine,
      id: cartId
    });

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_DISCOUNT_CODES_UPDATE,
        variables: {
          cartId,
          discountCodes: ['code']
        }
      })
    });
  });

  // Test Error Handling
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

  it('throws an error if the cart id is invalid', async () => {
    mockedFetchClient.mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<CartDiscountCodesUpdateMutation>({
          data: {
            cartDiscountCodesUpdate: { userErrors: [cartDoesNotExistUserError] }
          }
        })
    );

    expect.assertions(1);
    await cartDiscountCodesUpdate({
      gqlClient,
      cartId,
      discountCodes: ['code']
    }).catch((e) =>
      expect(String(e).includes(cartDoesNotExistUserError.message)).toBe(true)
    );
  });
});
