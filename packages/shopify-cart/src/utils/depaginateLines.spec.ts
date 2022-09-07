/* eslint-disable @typescript-eslint/no-explicit-any */
import depaginateLines from './depaginateLines';
import fetchClient from 'cross-fetch';
import { Cart_CartFragment } from '../types/shopify.type';
import { createGqlClient } from '../utils';
import { mockJsonResponse } from '../../__tests__/utils';
import {
  clientSettings,
  responses,
  graphqlEndpoint,
  headers,
  cartWithPaginatedLines
} from '../../__tests__/mocks';
import queries from '../graphql/queries';

jest.mock('cross-fetch');

const gqlClient = createGqlClient({ ...clientSettings, fetchClient });
const mockedFetchClient = jest.mocked(fetchClient, true);

describe('depaginate lines', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('make a request with the expected query and variables', async () => {
    mockedFetchClient.mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<{ cart: Cart_CartFragment }>(responses.queries.cart)
    );

    await depaginateLines({
      cart: cartWithPaginatedLines,
      gqlClient
    });
    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: queries.CART(),
        variables: {
          id: cartWithPaginatedLines.id,
          afterCursor: cartWithPaginatedLines.lines.pageInfo.endCursor
        }
      })
    });
  });
  it('makes a request the expected number of times', async () => {
    mockedFetchClient
      .mockImplementationOnce(
        (): Promise<any> =>
          mockJsonResponse<{ cart: Cart_CartFragment }>(
            responses.queries.cartWithPaginatedLines
          )
      )
      .mockImplementationOnce(
        (): Promise<any> =>
          mockJsonResponse<{ cart: Cart_CartFragment }>(responses.queries.cart)
      );

    await depaginateLines({
      cart: cartWithPaginatedLines,
      gqlClient
    });
    expect(fetchClient).toHaveBeenCalledTimes(2);
  });
  it('returns null if cart param is falsy', async () => {
    expect(await depaginateLines({ cart: undefined, gqlClient })).toBe(null);
  });
  it('throws an error if there are problems with the request', async () => {
    const networkErrorMessage = 'Network error!';
    mockedFetchClient.mockImplementation(
      (): Promise<any> => Promise.reject(networkErrorMessage)
    );

    expect.assertions(1);
    await expect(
      depaginateLines({ gqlClient, cart: cartWithPaginatedLines })
    ).rejects.toThrow(networkErrorMessage);
  });
});
