/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchClient from 'cross-fetch';
import { CartAttributesUpdateMutation } from '../../types/shopify.type';
import { createGqlClient } from '../../utils';
import formatCartResponse from '../../utils/formatCartResponse';
import { mockJsonResponse } from '../../../__tests__/utils';
import {
  cartId,
  clientSettings,
  graphqlEndpoint,
  headers,
  responses
} from '../../../__tests__/mocks';
import cartAttributesUpdate from './cartAttributesUpdate';
import mutations from '../../graphql/mutations';

jest.mock('cross-fetch');
jest.mock('../../utils/formatCartResponse');

const gqlClient = createGqlClient({ ...clientSettings, fetchClient });
const mockedFetchClient = jest.mocked(fetchClient, true);
const mockedFormatCartResponse = jest.mocked(formatCartResponse, true);

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
    await cartAttributesUpdate({
      gqlClient,
      cartId,
      attributes: [{ key: 'testKey', value: 'testValue' }]
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

    expect(mockedFormatCartResponse).toHaveBeenCalledTimes(1);
    expect(mockedFormatCartResponse).toHaveBeenCalledWith({
      cart: responses.mutations.cartAttributesUpdate.noAttributes.data
        ?.cartAttributesUpdate?.cart,
      userErrors:
        responses.mutations.cartAttributesUpdate.noAttributes.data
          ?.cartAttributesUpdate?.userErrors,
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
      cartAttributesUpdate({
        gqlClient,
        cartId,
        attributes: [{ key: 'testKey', value: 'testValue' }]
      })
    ).rejects.toThrow(networkErrorMessage);
  });
});
