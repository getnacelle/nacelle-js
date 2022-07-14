/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchClient from 'cross-fetch';
import { mocked } from 'ts-jest/utils';
import { queryCheckout } from '../../client/actions';
import { createGqlClient } from '../../utils';
import { mockJsonResponse } from '../../../__tests__/utils';
import {
  clientSettings,
  checkouts,
  graphqlEndpoint,
  headers,
  mockCustomQuery,
  mockCustomQueryvariables
} from '../../../__tests__/mocks';

jest.mock('cross-fetch');
const gqlClient = createGqlClient({ ...clientSettings, fetchClient });

describe('custom query', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('makes the expected request when sending custom query', async () => {
    mocked(fetchClient).mockImplementationOnce(
      (): Promise<any> =>
        mockJsonResponse<unknown>(checkouts.shippingAddressUpdate)
    );

    await expect(
      queryCheckout({
        gqlClient,
        query: mockCustomQuery,
        variables: mockCustomQueryvariables
      }).then((response) => response)
    ).resolves.toMatchObject(checkouts.shippingAddressUpdate);

    expect(fetchClient).toHaveBeenCalledTimes(1);
    expect(fetchClient).toHaveBeenCalledWith(graphqlEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: mockCustomQuery,
        variables: mockCustomQueryvariables
      })
    });
  });
});
