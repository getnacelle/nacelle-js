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
        mockJsonResponse({
          data: {
            checkoutCreate: {
              checkout: checkouts.checkoutCreate
            }
          }
        })
    );

    await expect(
      putCheckout({ gqlClient, lineItems: cartItems }).then(
        (checkout) => checkout
      )
    ).resolves.toMatchObject({
      id: checkouts.checkoutCreate.id,
      webUrl: checkouts.checkoutCreate.webUrl
    });

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
        mockJsonResponse({
          data: {
            checkoutCreate: {
              checkout: { ...checkouts.checkoutCreate, customAttributes, note }
            }
          }
        })
    );

    await expect(
      putCheckout({
        gqlClient,
        lineItems: cartItems,
        customAttributes,
        note
      }).then((checkout) => checkout)
    ).resolves.toMatchObject({
      id: checkouts.checkoutCreate.id,
      webUrl: checkouts.checkoutCreate.webUrl,
      customAttributes,
      note
    });

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
});
