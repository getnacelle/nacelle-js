import {
  Storefront,
  StorefrontInstance,
  StorefrontConnectorParams
} from '@nacelle/storefront-sdk';

export default function useSdk(
  params: StorefrontConnectorParams
): StorefrontInstance {
  return Storefront(params);
}
