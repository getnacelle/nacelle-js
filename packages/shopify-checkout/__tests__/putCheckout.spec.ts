/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchClient from 'cross-fetch';
import { mocked } from 'ts-jest/utils';
import { putCheckout } from '~/client/actions';
import * as mutations from '~/graphql/mutations';
import { createGqlClient } from '~/utils';
import { Attribute } from '~/checkout-client.types';
import {
  cartItems,
  clientSettings,
  checkoutId,
  checkouts,
  graphqlEndpoint,
  headers
} from '__tests__/mocks';
import { mockJsonResponse } from '__tests__/utils';

jest.mock('cross-fetch');
const gqlClient = createGqlClient({ ...clientSettings, fetchClient });

describe('putCheckout', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('creates a new checkout', async () => {
    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<mutations.CheckoutCreateData>(checkouts.checkoutCreate)
    );

    if (typeof checkouts.checkoutCreate.data === 'undefined') {
      fail('mock checkoutCreate data is falsey');
    }

    await expect(
      putCheckout({ gqlClient, lineItems: cartItems }).then(
        (checkout) => checkout
      )
    ).resolves.toMatchObject(
      checkouts.checkoutCreate.data.checkoutCreate.checkout
    );

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
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

  it('creates a new checkout with the correct attributes', async () => {
    const customAttributes: Attribute[] = [
      { key: 'includeGlitterInBox', value: 'definitely' }
    ];
    const note = 'Happy Birthday!';

    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<mutations.CheckoutCreateData>(checkouts.checkoutCreate)
    );

    if (typeof checkouts.checkoutCreate.data === 'undefined') {
      fail('mock checkoutCreate data is falsey');
    }

    await expect(
      putCheckout({
        gqlClient,
        lineItems: cartItems,
        customAttributes,
        note
      }).then((checkout) => checkout)
    ).resolves.toMatchObject(
      checkouts.checkoutCreate.data.checkoutCreate.checkout
    );

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.checkoutCreate,
        variables: {
          input: {
            customAttributes,
            lineItems: cartItems,
            note
          }
        }
      })
    });
  });

  it('updates an existing checkout with new properties', async () => {
    const customAttributes: Attribute[] = [
      { key: 'includeGlitterInBox', value: 'definitely' }
    ];
    const note = 'Happy Birthday!';

    const checkoutUpdate = checkouts.checkoutUpdate({
      checkoutId,
      input: { customAttributes, note }
    });

    if (
      typeof checkouts.checkoutCreate.data === 'undefined' ||
      typeof checkoutUpdate.data === 'undefined'
    ) {
      fail('mock checkoutCreate data is falsey');
    }

    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<mutations.CheckoutAttributesUpdateData>(checkoutUpdate)
    );

    await expect(
      putCheckout({
        gqlClient,
        checkoutId,
        customAttributes,
        note
      }).then((checkout) => checkout)
    ).resolves.toMatchObject(
      checkoutUpdate.data.checkoutAttributesUpdateV2.checkout
    );

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.checkoutAttributesUpdate,
        variables: {
          checkoutId,
          input: {
            customAttributes,
            note
          }
        }
      })
    });
  });

  it("updates an existing checkout's line items", async () => {
    const newLineItems = cartItems.slice(0, 2).map((lineItem) => ({
      ...lineItem,
      quantity: lineItem.quantity * 2,
      customAttributes: [
        { key: 'care_instructions', value: 'hand wash; drip dry' }
      ]
    }));

    const checkoutLineItemsReplace = checkouts.checkoutLineItemsReplace({
      checkoutId,
      lineItems: newLineItems
    });

    if (typeof checkoutLineItemsReplace.data === 'undefined') {
      fail('mock checkoutCreate data is falsey');
    }

    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<mutations.CheckoutLineItemsReplaceData>(
          checkoutLineItemsReplace
        )
    );

    await expect(
      putCheckout({
        gqlClient,
        checkoutId,
        lineItems: newLineItems
      }).then((checkout) => checkout)
    ).resolves.toMatchObject(
      checkoutLineItemsReplace.data.checkoutLineItemsReplace.checkout
    );

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.checkoutLineItemsReplace,
        variables: {
          checkoutId,
          lineItems: newLineItems
        }
      })
    });
  });
});
