/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchClient from 'cross-fetch';
import { Cart_CartFragment } from '../../types/shopify.type';
import { createGqlClient, cartFromGql } from '../../utils';
import { mockJsonResponse } from '../../../__tests__/utils';
import {
  clientSettings,
  cartId,
  responses,
  graphqlEndpoint,
  headers,
  cartWithLineResponse,
  shopifyErrors
} from '../../../__tests__/mocks';
import cart from './cart';
import queries from '../../graphql/queries';
import { ShopifyError } from '../../types/errors.type';

jest.mock('cross-fetch');

const gqlClient = createGqlClient({ ...clientSettings, fetchClient });
const mockedFetchClient = jest.mocked(fetchClient, true);

describe('fetch cart', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('make a request with the expected query and variables', async () => {
    mockedFetchClient.mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<{ cart: Cart_CartFragment }>(responses.queries.cart)
    );

    await expect(cart({ gqlClient, cartId })).resolves.toStrictEqual(
      cartFromGql(cartWithLineResponse)
    );

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: queries.CART(),
        variables: { id: cartId }
      })
    });
  });

  //Test Error Handling
  it('throws an error if there are problems with the request', async () => {
    const networkErrorMessage = 'Network error!';
    mockedFetchClient.mockImplementation(
      (): Promise<any> => Promise.reject(networkErrorMessage)
    );

    expect.assertions(1);
    await expect(cart({ gqlClient, cartId })).rejects.toThrow(
      networkErrorMessage
    );
  });

  it('throws an error if the cart id is invalid', async () => {
    const checkoutIdNotValid = shopifyErrors.cartIdNotValid('not-a-valid-id');
    const problemMessage = String(
      checkoutIdNotValid.extensions.problems[0].message
    );

    mockedFetchClient.mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<{ errors: ShopifyError[] }>({
          errors: [shopifyErrors.cartIdNotValid('not-a-valid-id')]
        })
    );

    expect.assertions(1);
    await cart({ gqlClient, cartId }).catch((e) =>
      expect(String(e).includes(problemMessage)).toBe(true)
    );
  });
});
