/* eslint-disable @typescript-eslint/no-explicit-any */
import createShopifyCheckoutClient from '~/client';
import fetchClient from 'cross-fetch';
import { mocked } from 'ts-jest/utils';
import * as queries from '~/graphql/queries';
import { mockJsonResponse } from '__tests__/utils';
import { clientSettings, checkoutId, webUrl } from '__tests__/mocks';

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
      fetchClient
    });
    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<queries.GetCheckoutData>({
          data: {
            node: {
              id: checkoutId,
              webUrl,
              completedAt: null,
              note: null,
              customAttributes: []
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
    expect(fetchClient).toHaveBeenCalledTimes(1);
  });

  it('makes requests to the expected graphql endpoint when given a `customEndpoint`', async () => {
    const settings = {
      storefrontCheckoutToken: clientSettings.storefrontCheckoutToken,
      customEndpoint:
        'https://checkout.nacelle-swag-store.shopify.com/api/graphql.json'
    };
    const checkoutClient = createShopifyCheckoutClient({
      ...settings,
      fetchClient
    });

    const parsedUrl = new URL(webUrl);
    parsedUrl.host = 'checkout.nacelle-swag-store.shopify.com';
    const customEndointCheckoutUrl = parsedUrl.toString();

    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<queries.GetCheckoutData>({
          data: {
            node: {
              id: checkoutId,
              webUrl: customEndointCheckoutUrl,
              completedAt: null,
              customAttributes: [],
              note: null
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
    expect(fetchClient).toHaveBeenCalledTimes(1);
  });
});
