/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchClient from 'cross-fetch';
import { mocked } from 'ts-jest/utils';
import { applyDiscount, removeDiscount } from '../../client/actions';
import { buildCheckout, createGqlClient } from '../../utils';
import * as mutations from '../../graphql/mutations';
import { mockJsonResponse } from '../../../__tests__/utils';
import {
  clientSettings,
  checkoutId,
  checkouts,
  discountCode,
  shopifyErrors
} from '../../../__tests__/mocks';

jest.mock('cross-fetch');
const gqlClient = createGqlClient({ ...clientSettings, fetchClient });

describe('discount', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('applyDiscount mutation', async () => {
    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<mutations.CheckoutDiscountCodeApplyV2Data>(
          checkouts.applyDiscount
        )
    );
    if (!checkouts.applyDiscount.data?.checkoutDiscountCodeApplyV2.checkout) {
      fail('mock applyDiscount data is falsey');
    }
    await expect(
      applyDiscount({
        gqlClient,
        id: checkoutId,
        discountCode
      }).then((checkout) => checkout)
    ).resolves.toMatchObject(
      buildCheckout(
        checkouts.applyDiscount.data.checkoutDiscountCodeApplyV2.checkout
      )
    );
  });

  it('removeDiscount mutation', async () => {
    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<mutations.CheckoutDiscountCodeRemoveData>(
          checkouts.removeDiscount
        )
    );
    if (!checkouts.removeDiscount.data?.checkoutDiscountCodeRemove.checkout) {
      fail('mock removeDiscount data is falsey');
    }
    await expect(
      removeDiscount({
        gqlClient,
        id: checkoutId
      }).then((checkout) => checkout)
    ).resolves.toMatchObject(
      buildCheckout(
        checkouts.removeDiscount.data.checkoutDiscountCodeRemove.checkout
      )
    );
  });

  it('throws an error if there are problems with the request', async () => {
    const networkErrorMessage = 'Network error!';
    mocked(fetchClient).mockImplementation(
      (): Promise<any> => Promise.reject(networkErrorMessage)
    );

    // we'll test both `applyDiscount` and `removeDiscount`
    expect.assertions(2);

    // [1/2] `applyDiscount`
    await expect(applyDiscount({ gqlClient, id: checkoutId })).rejects.toThrow(
      networkErrorMessage
    );

    // [2/2] `removeDiscount`
    await expect(removeDiscount({ gqlClient, id: checkoutId })).rejects.toThrow(
      networkErrorMessage
    );
  });

  it('throws an error if an invalid `id` is provided', async () => {
    const networkErrorMessage = 'Network error!';
    mocked(fetchClient).mockImplementation(
      (): Promise<any> => Promise.reject(networkErrorMessage)
    );

    // we'll test both `applyDiscount` and `removeDiscount`
    expect.assertions(2);

    // [1/2] `applyDiscount`
    await expect(
      applyDiscount({
        gqlClient,
        id: '998877',
        discountCode
      })
    ).rejects.toThrow();

    // [2/2] `removeDiscount`
    await expect(
      removeDiscount({
        gqlClient,
        id: '998877'
      })
    ).rejects.toThrow();
  });

  it("throws an error if the checkout can't be found when a `id` is provided", async () => {
    // we'll test both `applyDiscount` and `checkoutAttributesUpdate`
    expect.assertions(2);
    const doesNotExistMessage = '"message": "Checkout does not exist"';

    // [1/2] `applyDiscount`
    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<mutations.CheckoutDiscountCodeApplyV2Data>(
          shopifyErrors.notFound.checkoutDiscountCodeApplyV2
        )
    );

    await expect(
      applyDiscount({
        gqlClient,
        id: checkoutId,
        discountCode
      }).catch((e) =>
        expect(String(e).includes(doesNotExistMessage)).toBe(true)
      )
    );

    // // [2/2] `removeDiscount`
    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<mutations.CheckoutDiscountCodeRemoveData>(
          shopifyErrors.notFound.checkoutDiscountCodeRemove
        )
    );

    await expect(
      removeDiscount({
        gqlClient,
        id: checkoutId
      }).catch((e) =>
        expect(String(e).includes(doesNotExistMessage)).toBe(true)
      )
    );
  });
});
