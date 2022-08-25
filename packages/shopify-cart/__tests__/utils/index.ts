import { ShopifyError } from '../../src/types/errors.type';

type MockJsonResponseParams<D> = {
  data?: D;
  errors?: ShopifyError[];
};

export function mockJsonResponse<R>(
  response: MockJsonResponseParams<R>
): Promise<{
  json(): Promise<MockJsonResponseParams<R>>;
}> {
  return Promise.resolve({
    json() {
      return Promise.resolve(response);
    }
  });
}
