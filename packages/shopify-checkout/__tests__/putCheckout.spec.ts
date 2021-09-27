/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchClient from 'cross-fetch';
import { mocked } from 'ts-jest/utils';
import { putCheckout } from '~/client/actions';
import { createGqlClient } from '~/utils';
import * as mutations from '~/graphql/mutations';
import { Attribute } from '~/checkout-client.types';
import { mockJsonResponse } from '__tests__/utils';
import {
  cartItems,
  clientSettings,
  checkoutId,
  checkouts,
  graphqlEndpoint,
  headers,
  newCartItems,
  shopifyErrors
} from '__tests__/mocks';

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

    if (!checkouts.checkoutCreate.data?.checkoutCreate.checkout) {
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

    if (!checkouts.checkoutCreate.data?.checkoutCreate.checkout) {
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
      !checkouts.checkoutCreate.data?.checkoutCreate.checkout ||
      !checkoutUpdate.data?.checkoutAttributesUpdateV2.checkout
    ) {
      fail('mock [checkoutCreate|checkoutAttributesUpdateV2] data is falsey');
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
    const checkoutLineItemsReplace = checkouts.checkoutLineItemsReplace({
      checkoutId,
      lineItems: newCartItems
    });

    if (!checkoutLineItemsReplace.data?.checkoutLineItemsReplace.checkout) {
      fail('mock [checkoutLineItemsReplace] data is falsey');
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
        lineItems: newCartItems
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
          lineItems: newCartItems
        }
      })
    });
  });

  // Test Error Handling
  it('throws an error if an invalid `variantId` is provided', async () => {
    expect.assertions(1);

    const invalidVariantId = 'not-a-valid-id';
    const checkoutIdNotValid = shopifyErrors.invalidVariantId(invalidVariantId);
    const problemExplanation =
      checkoutIdNotValid.extensions.problems[0].explanation;

    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<mutations.CheckoutCreateData>({
          errors: [checkoutIdNotValid]
        })
    );

    await putCheckout({
      gqlClient,
      lineItems: [{ variantId: invalidVariantId, quantity: 1 }]
    }).catch((e) => expect(String(e).includes(problemExplanation)).toBe(true));
  });

  it('throws an error if the `checkoutCreate` mutation variables include a value of an incorrect type', async () => {
    expect.assertions(1);

    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<mutations.CheckoutCreateData>({
          errors: [shopifyErrors.typeError]
        })
    );

    // TypeScript won't let us actually do this in the `putCheckout` call,
    // but given the mock implementation, we can pretend that we've passed
    // a line item quantity as a string ("2") instead of a number (2).
    await putCheckout({
      gqlClient,
      lineItems: [{ ...cartItems[0] }]
    }).catch((e) =>
      expect(String(e).includes('Could not coerce value')).toBe(true)
    );
  });

  it("throws an error if the checkout can't be found when a `checkoutId` is provided", async () => {
    // we'll test both `checkoutLineItemsReplace` and `checkoutAttributesUpdate`
    expect.assertions(2);
    const doesNotExistMessage = '"message": "Checkout does not exist"';

    // [1/2] `checkoutAttributesUpdate`
    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<mutations.CheckoutAttributesUpdateData>(
          shopifyErrors.notFound.checkoutAttributesUpdate
        )
    );

    await expect(
      putCheckout({
        gqlClient,
        checkoutId,
        note: 'Happy Birthday!'
      }).catch((e) =>
        expect(String(e).includes(doesNotExistMessage)).toBe(true)
      )
    );

    // [2/2] `checkoutLineItemsReplace`
    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<mutations.CheckoutLineItemsReplaceData>(
          shopifyErrors.notFound.checkoutLineItemsReplace
        )
    );

    await expect(
      putCheckout({
        gqlClient,
        checkoutId,
        lineItems: newCartItems
      }).catch((e) =>
        expect(String(e).includes(doesNotExistMessage)).toBe(true)
      )
    );
  });

  it('throws an error if an invalid `checkoutId` is provided', async () => {
    // we'll test both `checkoutLineItemsReplace` and `checkoutAttributesUpdate`
    expect.assertions(2);

    const invalidCheckoutId = 'not-a-valid-id';
    const checkoutIdNotValid =
      shopifyErrors.checkoutIdNotValid(invalidCheckoutId);
    const problemMessage = String(
      checkoutIdNotValid.extensions.problems[0].message
    );

    // [1/2] `checkoutAttributesUpdate`
    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<mutations.CheckoutAttributesUpdateData>({
          errors: [shopifyErrors.checkoutIdNotValid(invalidCheckoutId)]
        })
    );

    await putCheckout({ gqlClient, checkoutId, note: 'Happy Birthday!' }).catch(
      (e) => expect(String(e).includes(problemMessage)).toBe(true)
    );

    // [2/2] `checkoutLineItemsReplace`
    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<mutations.CheckoutLineItemsReplaceData>({
          errors: [shopifyErrors.checkoutIdNotValid(invalidCheckoutId)]
        })
    );

    await putCheckout({ gqlClient, checkoutId, lineItems: newCartItems }).catch(
      (e) => expect(String(e).includes(problemMessage)).toBe(true)
    );
  });
});
