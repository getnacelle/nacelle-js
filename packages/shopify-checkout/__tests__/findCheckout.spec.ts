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
  headers,
  shopifyErrors
} from '__tests__/mocks';
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

    await expect(
      findCheckout({ gqlClient, id: checkoutId }).then((checkout) => checkout)
    ).resolves.toMatchObject({
      id: checkoutId,
      webUrl: webUrl
    });

    expect(isoFetch).toHaveBeenCalledTimes(1);
    expect(isoFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: getCheckoutQuery,
        variables: { id: checkoutId }
      })
    });
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

    await expect(
      findCheckout({ gqlClient, id: checkoutId }).then(
        (checkout) => checkout?.completed
      )
    ).resolves.toBe(false);
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
    await expect(
      findCheckout({ gqlClient, id: checkoutId }).then(
        (checkout) => checkout?.completed
      )
    ).resolves.toBe(true);
  });

  it("throws an error if the checkout can't be found", async () => {
    mocked(isoFetch).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse({
          data: {
            node: null
          }
        })
    );

    expect.assertions(1);
    await findCheckout({ gqlClient, id: checkoutId }).catch((e) =>
      expect(e).toStrictEqual(
        Error('[findCheckout] Checkout response has no data')
      )
    );
  });

  it('throws an error if the checkout id is invalid', async () => {
    mocked(isoFetch).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse({
          errors: [shopifyErrors.checkoutIdNotValid('not-a-valid-id')]
        })
    );

    expect.assertions(1);
    await findCheckout({ gqlClient, id: checkoutId }).catch((e) =>
      expect(e).toStrictEqual(
        Error(
          '[findCheckout] Shopify Storefront API Errors:' +
            '\n' +
            JSON.stringify(
              [shopifyErrors.checkoutIdNotValid('not-a-valid-id')],
              null,
              2
            )
        )
      )
    );
  });
});
