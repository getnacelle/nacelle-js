import type {
	StorefrontClientAdvancedOptions,
	StorefrontClientParams
} from '../index.js';
import type { AfterSubscriptions, DataFetchingMethodName } from './after.js';

export interface SetConfigParams {
	previewToken?: string | null;
	advancedOptions?: StorefrontClientAdvancedOptions;
}

export interface SetConfigResponse {
	endpoint: string;
	previewToken: string | undefined;
}

export interface StorefrontConfig extends StorefrontClientParams {
	afterSubscriptions?: AfterSubscriptions<DataFetchingMethodName>;
}
