/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchClient from 'cross-fetch';
import {
  CartSelectedDeliveryOptionsUpdateMutation,
  CountryCode,
  LanguageCode
} from '../../types/shopify.type';
import { createGqlClient } from '../../utils';
import formatCartResponse from '../../utils/formatCartResponse';
import { mockJsonResponse } from '../../../__tests__/utils';
import {
  cartId,
  clientSettings,
  graphqlEndpoint,
  headers,
  responses
} from '../../../__tests__/mocks';
import cartSelectedDeliveryOptionsUpdate from './cartSelectedDeliveryOptionsUpdate';
import mutations from '../../graphql/mutations';

jest.mock('cross-fetch');
jest.mock('../../utils/formatCartResponse');

const gqlClient = createGqlClient({ ...clientSettings, fetchClient });
const mockedFetchClient = jest.mocked(fetchClient, true);
const mockedFormatCartResponse = jest.mocked(formatCartResponse, true);
const defaultLanguage: LanguageCode = 'EN';
const defaultCountry: CountryCode = 'ZZ';
const defaultLocale = 'en-US';
const defaultShopId = 'shop-id';

describe('cartSelectedDeliveryOptionsUpdate', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('make a request with the expected query and variables', async () => {
    mockedFetchClient.mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<CartSelectedDeliveryOptionsUpdateMutation>(
          responses.mutations.cartSelectedDeliveryOptionsUpdate
        )
    );
    await cartSelectedDeliveryOptionsUpdate({
      gqlClient,
      cartId,
      selectedDeliveryOptions: [
        {
          deliveryGroupId: '123',
          deliveryOptionHandle: 'option-a'
        }
      ],
      shopifyShopId: defaultShopId,
      language: defaultLanguage,
      country: defaultCountry,
      locale: defaultLocale
    });

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mutations.CART_SELECTED_DELIVERY_OPTIONS_UPDATE(),
        variables: {
          cartId,
          selectedDeliveryOptions: [
            {
              deliveryGroupId: '123',
              deliveryOptionHandle: 'option-a'
            }
          ],
          language: defaultLanguage,
          country: defaultCountry
        }
      })
    });

    expect(mockedFormatCartResponse).toHaveBeenCalledTimes(1);
    expect(mockedFormatCartResponse).toHaveBeenCalledWith({
      cart: responses.mutations.cartSelectedDeliveryOptionsUpdate.data
        ?.cartSelectedDeliveryOptionsUpdate?.cart,
      userErrors:
        responses.mutations.cartSelectedDeliveryOptionsUpdate.data
          ?.cartSelectedDeliveryOptionsUpdate?.userErrors,
      errors: undefined,
      locale: defaultLocale,
      shopifyShopId: defaultShopId
    });
  });

  // Test Thrown Error
  it('throws an error if there are problems with the request', async () => {
    const networkErrorMessage = 'Network error!';
    mockedFetchClient.mockImplementation(
      (): Promise<any> => Promise.reject(networkErrorMessage)
    );

    expect.assertions(1);
    await expect(
      cartSelectedDeliveryOptionsUpdate({
        gqlClient,
        cartId,
        selectedDeliveryOptions: [
          {
            deliveryGroupId: '123',
            deliveryOptionHandle: 'option-a'
          }
        ],
        shopifyShopId: defaultShopId,
        language: defaultLanguage,
        country: defaultCountry,
        locale: defaultLocale
      })
    ).rejects.toThrow(networkErrorMessage);
  });
});
