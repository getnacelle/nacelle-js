/* eslint-disable @typescript-eslint/no-explicit-any */
import createShopifyCheckoutClient from '~/client';
import isoFetch from 'cross-fetch';
import { mocked } from 'ts-jest/utils';
import { clientSettings, checkoutId, webUrl } from '__tests__/mocks';
import { mockJsonResponse } from '__tests__/testUtils';

jest.mock('cross-fetch');

describe('createShopifyCheckoutClient', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('creates a client containing the expected functions', () => {
    const checkoutClient = createShopifyCheckoutClient(clientSettings);
    expect(checkoutClient).toBeInstanceOf(Object);
    expect(checkoutClient.get).toBeInstanceOf(Function);
    expect(checkoutClient.process).toBeInstanceOf(Function);
  });

  it('makes requests to the expected graphql endpoint when given a `myshopifyDomain` and `storefrontApiVersion`', async () => {
    const checkoutClient = createShopifyCheckoutClient({
      ...clientSettings,
      fetchClient: isoFetch
    });
    mocked(isoFetch).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse({
          data: {
            node: {
              id: checkoutId,
              webUrl,
              completedAt: null
            }
          }
        })
    );

    await expect(
      checkoutClient.get({ checkoutId: '998877' }).then((checkout) => checkout)
    ).resolves.toMatchObject({
      completed: false,
      id: checkoutId,
      customAttributes: [],
      webUrl
    });
    expect(isoFetch).toHaveBeenCalledTimes(1);
  });

  it('makes requests to the expected graphql endpoint when given a `customEndpoint`', async () => {
    const settings = {
      storefrontCheckoutToken: clientSettings.storefrontCheckoutToken,
      customEndpoint:
        'https://checkout.nacelle-swag-store.shopify.com/api/graphql.json'
    };
    const checkoutClient = createShopifyCheckoutClient({
      ...settings,
      fetchClient: isoFetch
    });

    const parsedUrl = new URL(webUrl);
    parsedUrl.host = 'checkout.nacelle-swag-store.shopify.com';
    const customEndointCheckoutUrl = parsedUrl.toString();

    mocked(isoFetch).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse({
          data: {
            node: {
              id: checkoutId,
              webUrl: customEndointCheckoutUrl,
              completedAt: null
            }
          }
        })
    );

    await expect(
      checkoutClient.get({ checkoutId: '998877' }).then((checkout) => checkout)
    ).resolves.toMatchObject({
      completed: false,
      id: checkoutId,
      customAttributes: [],
      webUrl: customEndointCheckoutUrl
    });
    expect(isoFetch).toHaveBeenCalledTimes(1);
  });
});
