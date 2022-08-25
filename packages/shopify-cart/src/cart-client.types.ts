import { ShopifyError } from './types/errors.type';

export type ShopifyResponse<D> = {
  data?: D;
  errors?: ShopifyError[];
};

export interface GqlClientParams<V> {
  query: string;
  variables: V;
}

export type GqlClient = <V, R>(
  params: GqlClientParams<V>
) => Promise<ShopifyResponse<R>>;

export type GqlStringField = string | null;
