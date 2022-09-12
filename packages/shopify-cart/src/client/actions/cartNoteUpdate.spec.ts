/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchClient from 'cross-fetch';
import {
  CartNoteUpdateMutation,
  CountryCode,
  LanguageCode
} from '../../types/shopify.type';
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
import cartNoteUpdate from '../../client/actions/cartNoteUpdate';
import mutations from '../../graphql/mutations';

jest.mock('cross-fetch');
jest.mock('../../utils/formatCartResponse');

const gqlClient = createGqlClient({ ...clientSettings, fetchClient });
const mockedFetchClient = jest.mocked(fetchClient, true);
const mockedFormatCartResponse = jest.mocked(formatCartResponse, true);
const defaultLanguage = LanguageCode.En;
const defaultCountry = CountryCode.Zz;

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
    await cartNoteUpdate({
      gqlClient,
      cartId,
      note: 'Cart Note',
      language: defaultLanguage,
      country: defaultCountry
    });

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_NOTE_UPDATE(),
        variables: {
          cartId,
          note: 'Cart Note',
          language: defaultLanguage,
          country: defaultCountry
        }
      })
    });

    expect(mockedFormatCartResponse).toHaveBeenCalledTimes(1);
    expect(mockedFormatCartResponse).toHaveBeenCalledWith({
      cart: responses.mutations.cartNoteUpdate.noNote.data?.cartNoteUpdate
        ?.cart,
      userErrors:
        responses.mutations.cartNoteUpdate.noNote.data?.cartNoteUpdate
          ?.userErrors,
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
      cartNoteUpdate({
        gqlClient,
        cartId,
        note: 'Cart Note',
        language: defaultLanguage,
        country: defaultCountry
      })
    ).rejects.toThrow(networkErrorMessage);
  });
});
