import type { StorefrontClient } from '../client/index.js';

export type StorefrontClientDerivative<T extends Partial<StorefrontClient>> =
	new (...args: any[]) => T;
export type WithStorefrontQuery = StorefrontClientDerivative<
	Pick<StorefrontClient, 'query'>
>;
export type WithConfig = StorefrontClientDerivative<
	Pick<StorefrontClient, 'getConfig'>
>;
