/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchClient from 'cross-fetch';
import { CartNoteUpdateMutation } from '../../types/shopify.type';
import { cartNoteUpdate } from '../../client/actions';
import mutations from '../../graphql/mutations';
import { createGqlClient } from '../../utils';
import { mockJsonResponse } from '../../../__tests__/utils';
import { cartDoesNotExistUserError } from '../../utils/handleShopifyError';
import {
  cartId,
  carts,
  clientSettings,
  graphqlEndpoint,
  headers,
  responses
} from '../../../__tests__/mocks';

jest.mock('cross-fetch');

const gqlClient = createGqlClient({ ...clientSettings, fetchClient });
const mockedFetchClient = jest.mocked(fetchClient, true);

describe('cartNoteUpdate', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('make a request with the expected query and variables', async () => {
    mockedFetchClient.mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<CartNoteUpdateMutation>(
          responses.mutations.cartNoteUpdate.noNote
        )
    );
    await expect(
      cartNoteUpdate({
        gqlClient,
        cartId,
        note: 'Cart Note'
      })
    ).resolves.toStrictEqual({
      ...carts.withoutLine
    });

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_NOTE_UPDATE(),
        variables: {
          cartId,
          note: 'Cart Note'
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
      cartNoteUpdate({ gqlClient, cartId, note: 'Cart Note' })
    ).rejects.toThrow(networkErrorMessage);
  });

  it('throws an error if the cart id is invalid', async () => {
    mockedFetchClient.mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<CartNoteUpdateMutation>({
          data: { cartNoteUpdate: { userErrors: [cartDoesNotExistUserError] } }
        })
    );

    expect.assertions(1);
    await cartNoteUpdate({
      gqlClient,
      cartId,
      note: 'Cart Note'
    }).catch((e) =>
      expect(String(e).includes(cartDoesNotExistUserError.message)).toBe(true)
    );
  });
});
