/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchClient from 'cross-fetch';
import { mocked } from 'ts-jest/utils';
import { findCheckout } from '../../client/actions';
import { ShopifyCheckout } from '../../checkout-client.types';
import { createGqlClient } from '../../utils';
import * as queries from '../../graphql/queries';
import { mockJsonResponse } from '../../../__tests__/utils';
import {
  clientSettings,
  checkoutIds,
  checkouts,
  webUrl,
  graphqlEndpoint,
  headers,
  shopifyErrors
} from '../../../__tests__/mocks';

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
      findCheckout({ gqlClient, id: checkoutIds.beginsWithLetter }).then(
        (checkout) => checkout
      )
    ).resolves.toMatchObject({
      id: checkoutIds.beginsWithLetter,
      url: webUrl,
      lines: [],
      discounts: []
    });

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: queries.getCheckout,
        variables: { id: checkoutIds.beginsWithLetter }
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
      findCheckout({ gqlClient, id: checkoutIds.beginsWithLetter }).then(
        (checkout) => (checkout as ShopifyCheckout)?.completed
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
      findCheckout({ gqlClient, id: checkoutIds.beginsWithLetter }).then(
        (checkout) => (checkout as ShopifyCheckout)?.completed
      )
    ).resolves.toBe(true);
  });

  // Test Error Handling
  it('throws an error if there are problems with the request', async () => {
    const networkErrorMessage = 'Network error!';
    mocked(fetchClient).mockImplementation(
      (): Promise<any> => Promise.reject(networkErrorMessage)
    );

    expect.assertions(1);
    await expect(
      findCheckout({ gqlClient, id: checkoutIds.beginsWithLetter })
    ).rejects.toThrow(networkErrorMessage);
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
    await findCheckout({ gqlClient, id: checkoutIds.beginsWithLetter }).catch(
      (e) =>
        expect(
          String(e).includes('[findCheckout] Checkout response has no data')
        ).toBe(true)
    );
  });

  it('throws an error if the checkout id is invalid', async () => {
    const checkoutIdNotValid =
      shopifyErrors.checkoutIdNotValid('not-a-valid-id');
    const problemMessage = String(
      checkoutIdNotValid.extensions.problems[0].message
    );

    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<queries.GetCheckoutData>({
          errors: [shopifyErrors.checkoutIdNotValid('not-a-valid-id')]
        })
    );

    expect.assertions(1);
    await findCheckout({ gqlClient, id: checkoutIds.beginsWithLetter }).catch(
      (e) => expect(String(e).includes(problemMessage)).toBe(true)
    );
  });
});
