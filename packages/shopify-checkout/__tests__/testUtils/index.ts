/* eslint-disable @typescript-eslint/no-explicit-any */
interface MockJsonResponseParams {
  data: any;
}

export function mockJsonResponse(data: MockJsonResponseParams): Promise<{
  json(): Promise<any>;
}> {
  return Promise.resolve({
    json() {
      return Promise.resolve(data);
    }
  });
}
