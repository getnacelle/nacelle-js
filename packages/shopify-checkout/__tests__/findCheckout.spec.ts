/* eslint-disable @typescript-eslint/no-explicit-any */
import isoFetch from 'cross-fetch';
import { mocked } from 'ts-jest/utils';
import { findCheckout } from '~/client/actions';
import { getCheckout as getCheckoutQuery } from '~/graphql/queries';
import { createGqlClient } from '~/utils';
import {
  clientSettings,
  checkoutId,
  webUrl,
  graphqlEndpoint,
  headers
} from '__tests__/fixtures';
import { mockJsonResponse } from '__tests__/testUtils';

jest.mock('cross-fetch');
const gqlClient = createGqlClient({ ...clientSettings, fetchClient: isoFetch });

describe('findCheckout', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('make a request with the expected query and variables', async () => {
    mocked(isoFetch).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse({
          data: {
            node: {
              id: checkoutId,
              webUrl
            }
          }
        })
    );
    const checkout = await findCheckout({ gqlClient, id: checkoutId });
    expect(isoFetch).toHaveBeenCalledTimes(1);
    expect(isoFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: getCheckoutQuery,
        variables: { id: checkoutId }
      })
    });
    expect(checkout).toBeTruthy();
    expect(checkout?.id).toBe(checkoutId);
    expect(checkout?.webUrl).toBe(webUrl);
  });

  it("signals that the checkout hasn't been completed when `completedAt` is `null`", async () => {
    mocked(isoFetch).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse({
          data: {
            node: {
              completedAt: null
            }
          }
        })
    );
    const checkout = await findCheckout({ gqlClient, id: checkoutId });
    expect(checkout?.completed).toBe(false);
  });

  it('signals that the checkout has been completed when `completedAt` is a timestamp', async () => {
    mocked(isoFetch).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse({
          data: {
            node: {
              completedAt: '2021-09-23T22:52:53Z'
            }
          }
        })
    );
    const checkout = await findCheckout({ gqlClient, id: checkoutId });
    expect(checkout?.completed).toBe(true);
  });
});
