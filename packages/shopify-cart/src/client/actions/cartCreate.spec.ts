/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchClient from 'cross-fetch';
import { CartCreateMutation } from '../../types/shopify.type';
import { cartCreate } from '../../client/actions';
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

    await expect(cartCreate({ gqlClient })).resolves.toStrictEqual({
      ...carts.withoutLine,
      id: cartId,
      lines: []
    });

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_CREATE(),
        variables: { input: {} }
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

    await expect(
      cartCreate({ gqlClient, params: { lines: [] } })
    ).resolves.toStrictEqual({
      ...carts.withoutLine,
      id: cartId,
      lines: []
    });

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_CREATE(),
        variables: { input: { lines: [] } }
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
      cartCreate({ gqlClient, params: { lines: [] } })
    ).rejects.toThrow(networkErrorMessage);
  });

  it('throws an error if the cart id is invalid', async () => {
    mockedFetchClient.mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<CartCreateMutation>({
          data: { cartCreate: { userErrors: [cartDoesNotExistUserError] } }
        })
    );

    expect.assertions(1);
    await cartCreate({ gqlClient, params: { lines: [] } }).catch((e) =>
      expect(String(e).includes(cartDoesNotExistUserError.message)).toBe(true)
    );
  });
});
