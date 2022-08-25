/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchClient from 'cross-fetch';
import {
  CartLineAddMutation,
  CartLineUpdateMutation,
  CartLineRemoveMutation
} from '../../types/shopify.type';
import { 
  cartLinesAdd,
  cartLinesRemove,
  cartLinesUpdate
 } from '../../client/actions';
import mutations from '../../graphql/mutations';
import { createGqlClient, cartFromGql } from '../../utils';
import { mockJsonResponse } from '../../../__tests__/utils';
import { cartDoesNotExistUserError } from '../../utils/handleShopifyError';
import {
  clientSettings,
  cartId,
  cartWithoutLineResponse,
  cartWithLineResponse,
  responses,
  graphqlEndpoint,
  headers
} from '../../../__tests__/mocks';

jest.mock('cross-fetch');

const gqlClient = createGqlClient({ ...clientSettings, fetchClient });
const mockedFetchClient = jest.mocked(fetchClient, true);

describe('cartLinesAdd', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('make a request with the expected query and variables', async () => {
    mockedFetchClient.mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<CartLineAddMutation>(responses.mutations.cartLinesAdd)
    );

    await expect(
      cartLinesAdd({
        gqlClient,
        cartId,
        lines: [
          {
            merchandiseId:
              cartWithLineResponse.cart.lines.edges[0].node.merchandise.id
          }
        ]
      })
    ).resolves.toStrictEqual(cartFromGql(cartWithLineResponse));

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_LINE_ADD,
        variables: {
          cartId,
          lines: [
            {
              merchandiseId:
                cartWithLineResponse.cart.lines.edges[0].node.merchandise.id
            }
          ]
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
      cartLinesAdd({
        gqlClient,
        cartId,
        lines: [
          {
            merchandiseId:
              cartWithLineResponse.cart.lines.edges[0].node.merchandise.id
          }
        ]
      })
    ).rejects.toThrow(networkErrorMessage);
  });

  it('throws an error if the cart id is invalid', async () => {
    mockedFetchClient.mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<CartLineAddMutation>({
          data: { cartLinesAdd: { userErrors: [cartDoesNotExistUserError] } }
        })
    );

    expect.assertions(1);
    await cartLinesAdd({
      gqlClient,
      cartId,
      lines: [
        {
          merchandiseId:
            cartWithLineResponse.cart.lines.edges[0].node.merchandise.id
        }
      ]
    }).catch((e) =>
      expect(String(e).includes(cartDoesNotExistUserError.message)).toBe(true)
    );
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
    updatedCart.cart.lines.edges[0].node.quantity = 2;

    await expect(
      cartLinesUpdate({
        gqlClient,
        cartId,
        lines: [
          {
            id: updatedCart.cart.lines.edges[0].node.id,
            merchandiseId: updatedCart.cart.lines.edges[0].node.merchandise.id,
            quantity: 2
          }
        ]
      })
    ).resolves.toStrictEqual(cartFromGql(updatedCart));

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_LINE_UPDATE,
        variables: {
          cartId,
          lines: [
            {
              id: updatedCart.cart.lines.edges[0].node.id,
              merchandiseId:
                updatedCart.cart.lines.edges[0].node.merchandise.id,
              quantity: 2
            }
          ]
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
      cartLinesUpdate({
        gqlClient,
        cartId,
        lines: [
          {
            id: cartWithLineResponse.cart.lines.edges[0].node.id,
            merchandiseId:
              cartWithLineResponse.cart.lines.edges[0].node.merchandise.id,
            quantity: 2
          }
        ]
      })
    ).rejects.toThrow(networkErrorMessage);
  });

  it('throws an error if the cart id is invalid', async () => {
    mockedFetchClient.mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<CartLineUpdateMutation>({
          data: { cartLinesUpdate: { userErrors: [cartDoesNotExistUserError] } }
        })
    );

    expect.assertions(1);
    await cartLinesUpdate({
      gqlClient,
      cartId,
      lines: [
        {
          id: cartWithLineResponse.cart.lines.edges[0].node.id,
          merchandiseId:
            cartWithLineResponse.cart.lines.edges[0].node.merchandise.id,
          quantity: 2
        }
      ]
    }).catch((e) =>
      expect(String(e).includes(cartDoesNotExistUserError.message)).toBe(true)
    );
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

    await expect(
      cartLinesRemove({
        gqlClient,
        cartId,
        lineIds: [cartWithLineResponse.cart.lines.edges[0].node.id]
      })
    ).resolves.toStrictEqual(cartFromGql(cartWithoutLineResponse));

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_LINE_REMOVE,
        variables: {
          cartId,
          lineIds: [cartWithLineResponse.cart.lines.edges[0].node.id]
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
      cartLinesRemove({
        gqlClient,
        cartId,
        lineIds: [cartWithLineResponse.cart.lines.edges[0].node.id]
      })
    ).rejects.toThrow(networkErrorMessage);
  });

  it('throws an error if the cart id is invalid', async () => {
    mockedFetchClient.mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<CartLineRemoveMutation>({
          data: { cartLinesRemove: { userErrors: [cartDoesNotExistUserError] } }
        })
    );

    expect.assertions(1);
    await cartLinesRemove({
      gqlClient,
      cartId,
      lineIds: [cartWithLineResponse.cart.lines.edges[0].node.id]
    }).catch((e) =>
      expect(String(e).includes(cartDoesNotExistUserError.message)).toBe(true)
    );
  });
});
