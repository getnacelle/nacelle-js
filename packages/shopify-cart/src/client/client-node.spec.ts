/**
 * @jest-environment node
 */

import createShopifyCartClient from './index';
import { fetchClientError } from '../utils/createGqlClient';
import { clientSettings } from '../../__tests__/mocks';

describe('createShopifyCartClient', () => {
  it("throws an error if client functions are called when `typeof window === 'undefined'` and an isomorphic fetch client hasn't been supplied", async () => {
    const checkoutClient = createShopifyCartClient(clientSettings);

    expect.assertions(1);
    await checkoutClient
      .cartCreate({})
      .catch((e) => expect(String(e).includes(fetchClientError)).toBe(true));
  });
});
