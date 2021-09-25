/* eslint-disable @typescript-eslint/no-explicit-any */
import isoFetch from 'cross-fetch';
import { mocked } from 'ts-jest/utils';
import { putCheckout } from '~/client/actions';
import * as mutations from '~/graphql/mutations';
import { createGqlClient } from '~/utils';
import {
  cartItems,
  clientSettings,
  checkoutId,
  webUrl,
  graphqlEndpoint,
  headers
} from '__tests__/fixtures';
import { mockJsonResponse } from '__tests__/testUtils';

jest.mock('cross-fetch');
const gqlClient = createGqlClient({ ...clientSettings, fetchClient: isoFetch });

describe('putCheckout', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('make a request with the expected query and variables', async () => {
    mocked(isoFetch).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse({
          data: {
            checkoutCreate: {
              checkout: {
                id: checkoutId,
                webUrl,
                note: null,
                createdAt: '2021-09-23T20:14:18Z',
                customAttributes: [],
                paymentDueV2: {
                  amount: '115.0',
                  currencyCode: 'USD'
                }
              }
            }
          }
        })
    );

    await expect(
      putCheckout({ gqlClient, lineItems: cartItems }).then(
        (checkout) => checkout
      )
    ).resolves.toMatchObject({
      id: checkoutId,
      webUrl: webUrl
    });

    expect(isoFetch).toHaveBeenCalledTimes(1);
    expect(isoFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.checkoutCreate,
        variables: {
          input: { lineItems: cartItems }
        }
      })
    });
  });
});
