/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchClient from 'cross-fetch';
import { CartAttributesUpdateMutation } from '../../types/shopify.type';
import { ShopifyError } from '../../types/errors.type';
import { cartAttributesUpdate } from '../../client/actions';
import mutations from '../../graphql/mutations';
import { createGqlClient } from '../../utils';
import { mockJsonResponse } from '../../../__tests__/utils';
import {
  cartId,
  carts,
  clientSettings,
  graphqlEndpoint,
  headers,
  responses,
  shopifyErrors
} from '../../../__tests__/mocks';

jest.mock('cross-fetch');

const gqlClient = createGqlClient({ ...clientSettings, fetchClient });
const mockedFetchClient = jest.mocked(fetchClient, true);

describe('cartAttributesUpdate', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('make a request with the expected query and variables', async () => {
    mockedFetchClient.mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<CartAttributesUpdateMutation>(
          responses.mutations.cartAttributesUpdate.noAttributes
        )
    );
    await expect(
      cartAttributesUpdate({
        gqlClient,
        cartId,
        attributes: [{ key: 'testKey', value: 'testValue' }]
      })
    ).resolves.toStrictEqual({
      cart: carts.withoutLine,
      userErrors: null,
      errors: null
    });

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_ATTRIBUTES_UPDATE,
        variables: {
          cartId,
          attributes: [{ key: 'testKey', value: 'testValue' }]
        }
      })
    });
  });

  // Test Returned Errors
  it('return the correct response when errors encountered', async () => {
    mockedFetchClient.mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<{ errors: ShopifyError[] }>({
          errors: [shopifyErrors.cartIdNotValid('123')]
        })
    );

    await expect(
      cartAttributesUpdate({ gqlClient, cartId, attributes: [] })
    ).resolves.toStrictEqual({
      cart: null,
      userErrors: null,
      errors: [shopifyErrors.cartIdNotValid('123')]
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
      cartAttributesUpdate({
        gqlClient,
        cartId,
        attributes: [{ key: 'testKey', value: 'testValue' }]
      })
    ).rejects.toThrow(networkErrorMessage);
  });
});
