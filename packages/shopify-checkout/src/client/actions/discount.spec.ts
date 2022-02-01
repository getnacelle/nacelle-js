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
  discountCode
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
});
