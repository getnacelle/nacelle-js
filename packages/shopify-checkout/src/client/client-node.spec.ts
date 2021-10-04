/**
 * @jest-environment node
 */

import createShopifyCheckoutClient from './index';
import { fetchClientError } from '../utils/createGqlClient';
import { clientSettings } from '../../__tests__/mocks';

describe('createShopifyCheckoutClient', () => {
  it("throws an error if client functions are called when `typeof window === 'undefined'` and an isomorphic fetch client hasn't been supplied", async () => {
    const checkoutClient = createShopifyCheckoutClient(clientSettings);

    expect.assertions(1);
    await checkoutClient
      .get({ id: '998877' })
      .catch((e) => expect(String(e).includes(fetchClientError)).toBe(true));
  });
});
