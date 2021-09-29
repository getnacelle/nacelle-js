/* eslint-disable @typescript-eslint/no-explicit-any */
import createShopifyCheckoutClient from '~/client';
import fetchClient from 'cross-fetch';
import { mocked } from 'ts-jest/utils';
import { cartItemsToCheckoutItems } from '~/utils';
import {
  fetchClientError,
  missingParametersErrorMessage
} from '~/utils/createGqlClient';
import * as queries from '~/graphql/queries';
import * as mutations from '~/graphql/mutations';
import { mockJsonResponse } from '__tests__/utils';
import {
  cartItems,
  checkouts,
  clientSettings,
  checkoutId,
  graphqlEndpoint,
  headers,
  webUrl
} from '__tests__/mocks';

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

  it("throws an error if client functions are called when `typeof window === 'undefined'` and an isomorphic fetch client hasn't been supplied", async () => {
    const checkoutClient = createShopifyCheckoutClient(clientSettings);
    expect.assertions(1);
    await checkoutClient
      .get({ id: '998877' })
      .catch((e) => expect(String(e).includes(fetchClientError)).toBe(true));
  });

  it('throws an error if neither (a) both a `myshopifyDomain` and `storefrontApiVersion`, nor (b) a `customEndpoint` are provided', async () => {
    const { storefrontCheckoutToken } = clientSettings;
    const checkoutClient = createShopifyCheckoutClient({
      storefrontCheckoutToken
    });

    await checkoutClient
      .get({ id: '998877' })
      .catch((e) =>
        expect(String(e).includes(missingParametersErrorMessage)).toBe(true)
      );
  });

  it('makes the expected request when given a `myshopifyDomain` and `storefrontApiVersion`', async () => {
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
              completedAt: null
            }
          }
        })
    );

    await expect(
      checkoutClient.get({ id: '998877' }).then((checkout) => checkout)
    ).resolves.toMatchObject({
      completed: false,
      id: checkoutId,
      url: webUrl
    });
    expect(fetchClient).toHaveBeenCalledTimes(1);
  });

  it('makes the expected request when given a `customEndpoint`', async () => {
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
              completedAt: null
            }
          }
        })
    );

    await expect(
      checkoutClient.get({ id: '998877' }).then((checkout) => checkout)
    ).resolves.toMatchObject({
      completed: false,
      id: checkoutId,
      url: customEndointCheckoutUrl
    });
    expect(fetchClient).toHaveBeenCalledTimes(1);
  });

  it('converts checkout-level and line item `metafields` to `customAttributes`', async () => {
    const checkoutClient = createShopifyCheckoutClient({
      ...clientSettings,
      fetchClient
    });
    const checkoutAttributes = [
      {
        key: 'handling_instructions',
        value: 'Caution! Dinosaur eggs - handle with extreme care.'
      }
    ];

    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<mutations.CheckoutCreateData>(checkouts.checkoutCreate)
    );

    await expect(
      checkoutClient
        .process({
          cartItems,
          metafields: checkoutAttributes
        })
        .then((checkout) => checkout)
    ).resolves.toMatchObject({
      completed: false,
      id: checkoutId,
      url: webUrl
    });
    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.checkoutCreate,
        variables: {
          input: {
            customAttributes: checkoutAttributes,
            lineItems: cartItemsToCheckoutItems({ cartItems })
          }
        }
      })
    });
  });

  it('makes the expected request when the `process` method is called with `lineItems` and without `metafields` & `note`', async () => {
    const checkoutClient = createShopifyCheckoutClient({
      ...clientSettings,
      fetchClient
    });

    // providing `cartItems` without `metafields` or `note` should only run `checkoutLineItemsReplace`
    const checkoutLineItemsReplace = checkouts.checkoutLineItemsReplace({
      checkoutId,
      lineItems: cartItemsToCheckoutItems({ cartItems })
    });

    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<mutations.CheckoutLineItemsReplaceData>(
          checkoutLineItemsReplace
        )
    );
    await checkoutClient.process({ id: checkoutId, cartItems });

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.checkoutLineItemsReplace,
        variables: {
          checkoutId,
          lineItems: cartItemsToCheckoutItems({ cartItems })
        }
      })
    });
  });

  it('makes the expected request when the `process` method is called with `metafields` & `note` and without `lineItems`', async () => {
    const checkoutClient = createShopifyCheckoutClient({
      ...clientSettings,
      fetchClient
    });

    // providing `metafields` or `note` without `cartItems` should only run `checkoutAttributesUpdate`
    const checkoutAttributes = [
      {
        key: 'handling_instructions',
        value: 'Caution! Dinosaur eggs - handle with extreme care.'
      }
    ];
    const note = 'Many thanks!';
    const checkoutUpdate = checkouts.checkoutUpdate({
      checkoutId,
      input: { customAttributes: checkoutAttributes, note }
    });

    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<mutations.CheckoutAttributesUpdateData>(checkoutUpdate)
    );

    await checkoutClient.process({
      id: checkoutId,
      metafields: checkoutAttributes,
      note
    });

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.checkoutAttributesUpdate,
        variables: {
          checkoutId,
          input: {
            customAttributes: checkoutAttributes,
            note
          }
        }
      })
    });
  });
});
