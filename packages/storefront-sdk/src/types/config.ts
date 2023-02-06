import type { Maybe } from './storefront.js';
import type {
	StorefrontClientAdvancedOptions,
	StorefrontClientParams
} from '../index.js';
import type { AfterSubscriptions, DataFetchingMethodName } from './after.js';

export interface SetConfigParams {
	previewToken?: Maybe<string>;
	advancedOptions?: Maybe<StorefrontClientAdvancedOptions>;
}
export interface SetConfigResponse {
	endpoint: string;
	previewToken: string | undefined;
}

export interface StorefrontConfig extends StorefrontClientParams {
	afterSubscriptions?: AfterSubscriptions<DataFetchingMethodName>;
}
