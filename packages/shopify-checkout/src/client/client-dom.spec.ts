/* eslint-disable @typescript-eslint/no-explicit-any */
import createShopifyCheckoutClient from './index';
import fetchClient from 'cross-fetch';
import { mocked } from 'ts-jest/utils';
import { cartItemsToCheckoutItems } from '../utils';
import { missingParametersErrorMessage } from '../utils/createGqlClient';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import { mockJsonResponse } from '../../__tests__/utils';
import {
  cartItems,
  checkouts,
  clientSettings,
  checkoutIds,
  graphqlEndpoint,
  headers,
  webUrl
} from '../../__tests__/mocks';

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
    expect(checkoutClient.discountApply).toBeInstanceOf(Function);
    expect(checkoutClient.discountRemove).toBeInstanceOf(Function);
  });

  it("uses `window.fetch` when `typeof window !== 'undefined'` and an isomorphic fetch client hasn't been supplied", async () => {
    const windowFetch = jest.fn(
      (): Promise<any> =>
        mockJsonResponse<queries.GetCheckoutData>(checkouts.findCheckout)
    );
    window.fetch = windowFetch;

    const checkoutClient = createShopifyCheckoutClient(clientSettings);
    await checkoutClient.get({ id: '998877' });

    expect(windowFetch).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: queries.getCheckout,
        variables: { id: '998877' }
      })
    });
  });

  it('throws an error if neither (a) both a `myshopifyDomain` and `storefrontApiVersion`, nor (b) a `customEndpoint` are provided', async () => {
    const { storefrontCheckoutToken } = clientSettings;
    const checkoutClient = createShopifyCheckoutClient({
      storefrontCheckoutToken
    });

    expect.assertions(1);
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
              id: checkoutIds.beginsWithLetter,
              webUrl,
              completedAt: null,
              lineItems: { edges: [] },
              discountApplications: { edges: [] }
            }
          }
        })
    );

    await expect(
      checkoutClient.get({ id: '998877' }).then((checkout) => checkout)
    ).resolves.toMatchObject({
      completed: false,
      id: checkoutIds.beginsWithLetter,
      url: webUrl,
      lines: [],
      discounts: []
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
              id: checkoutIds.beginsWithLetter,
              webUrl: customEndointCheckoutUrl,
              completedAt: null,
              lineItems: { edges: [] },
              discountApplications: { edges: [] }
            }
          }
        })
    );

    await expect(
      checkoutClient.get({ id: '998877' }).then((checkout) => checkout)
    ).resolves.toMatchObject({
      completed: false,
      id: checkoutIds.beginsWithLetter,
      url: customEndointCheckoutUrl,
      lines: [],
      discounts: []
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
      checkoutId: checkoutIds.beginsWithLetter,
      lineItems: cartItemsToCheckoutItems({ cartItems })
    });

    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<mutations.CheckoutLineItemsReplaceData>(
          checkoutLineItemsReplace
        )
    );
    await checkoutClient.process({
      id: checkoutIds.beginsWithLetter,
      cartItems
    });

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.checkoutLineItemsReplace,
        variables: {
          checkoutId: checkoutIds.beginsWithLetter,
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
      checkoutId: checkoutIds.beginsWithLetter,
      input: { customAttributes: checkoutAttributes, note }
    });

    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<mutations.CheckoutAttributesUpdateData>(checkoutUpdate)
    );

    await checkoutClient.process({
      id: checkoutIds.beginsWithLetter,
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
          checkoutId: checkoutIds.beginsWithLetter,
          input: {
            customAttributes: checkoutAttributes,
            note
          }
        }
      })
    });
  });

  it('makes the expected request when applying a discount code', async () => {
    const checkoutClient = createShopifyCheckoutClient({
      ...clientSettings,
      fetchClient
    });

    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<mutations.CheckoutDiscountCodeApplyV2Data>(
          checkouts.applyDiscount
        )
    );

    await expect(
      checkoutClient.discountApply({
        id: checkoutIds.beginsWithLetter,
        discountCode: 'BFCM2020'
      })
    ).resolves.toMatchObject({
      completed: false,
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
        query: mutations.checkoutDiscountCodeApplyV2,
        variables: {
          input: {
            checkoutId: checkoutIds.beginsWithLetter,
            discountCode: 'BFCM2020'
          }
        }
      })
    });
  });

  it('makes the expected request when removing a discount code', async () => {
    const checkoutClient = createShopifyCheckoutClient({
      ...clientSettings,
      fetchClient
    });

    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<mutations.CheckoutDiscountCodeRemoveData>(
          checkouts.removeDiscount
        )
    );

    await expect(
      checkoutClient.discountRemove({
        id: checkoutIds.beginsWithLetter
      })
    ).resolves.toMatchObject({
      completed: false,
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
        query: mutations.checkoutDiscountCodeRemove,
        variables: {
          input: {
            checkoutId: checkoutIds.beginsWithLetter
          }
        }
      })
    });
  });
});
