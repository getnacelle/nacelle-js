import type { Maybe } from './storefront.js';
import type { StorefrontClientParams } from '../index.js';

export interface SetConfigParams {
	previewToken?: Maybe<string>;
}

export interface SetConfigResponse {
	endpoint: string;
	previewToken: string | undefined;
}

export interface AfterSubscription {
	method: string;
	callback: <T>(responseObj: T) => Promise<T> | T;
}

export interface StorefrontConfig extends StorefrontClientParams {
	afterSubscriptions?: AfterSubscription[];
}
