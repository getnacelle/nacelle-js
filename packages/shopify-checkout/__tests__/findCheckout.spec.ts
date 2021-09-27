/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchClient from 'cross-fetch';
import { mocked } from 'ts-jest/utils';
import { findCheckout } from '~/client/actions';
import * as queries from '~/graphql/queries';
import { createGqlClient } from '~/utils';
import {
  clientSettings,
  checkoutId,
  checkouts,
  webUrl,
  graphqlEndpoint,
  headers,
  shopifyErrors
} from '__tests__/mocks';
import { mockJsonResponse } from '__tests__/utils';

jest.mock('cross-fetch');
const gqlClient = createGqlClient({ ...clientSettings, fetchClient });

describe('findCheckout', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('make a request with the expected query and variables', async () => {
    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<queries.GetCheckoutData>(checkouts.findCheckout)
    );

    await expect(
      findCheckout({ gqlClient, id: checkoutId }).then((checkout) => checkout)
    ).resolves.toMatchObject({
      id: checkoutId,
      webUrl
    });

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: queries.getCheckout,
        variables: { id: checkoutId }
      })
    });
  });

  it("signals that the checkout hasn't been completed when `completedAt` is `null`", async () => {
    const checkoutResponse = checkouts.findCheckout;
    if (checkoutResponse.data?.node) {
      checkoutResponse.data.node.completedAt = null;
    }

    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<queries.GetCheckoutData>(checkoutResponse)
    );

    await expect(
      findCheckout({ gqlClient, id: checkoutId }).then(
        (checkout) => checkout?.completed
      )
    ).resolves.toBe(false);
  });

  it('signals that the checkout has been completed when `completedAt` is a timestamp', async () => {
    const checkoutResponse = { ...checkouts.findCheckout };
    if (checkoutResponse.data?.node) {
      checkoutResponse.data.node.completedAt = '2021-09-23T22:52:53Z';
    }

    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<queries.GetCheckoutData>(checkoutResponse)
    );
    await expect(
      findCheckout({ gqlClient, id: checkoutId }).then(
        (checkout) => checkout?.completed
      )
    ).resolves.toBe(true);
  });

  it("throws an error if the checkout can't be found", async () => {
    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<queries.GetCheckoutData>({
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
    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<queries.GetCheckoutData>({
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
