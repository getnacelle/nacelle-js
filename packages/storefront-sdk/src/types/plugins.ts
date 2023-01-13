import type { StorefrontClient } from '../index.js';

export type StorefrontClientDerivative<T extends Partial<StorefrontClient>> =
	new (...args: any[]) => T;
export type WithStorefrontQuery = StorefrontClientDerivative<
	Pick<StorefrontClient, 'query'>
>;
