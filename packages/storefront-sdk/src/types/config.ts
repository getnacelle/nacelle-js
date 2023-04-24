import type { StorefrontClientParams } from '../index.js';
import type { AfterSubscriptions } from './after.js';

export interface SetConfigParams {
	previewToken?: string | null;
}

export interface SetConfigResponse {
	endpoint: string;
	previewToken: string | undefined;
}

export interface StorefrontConfig
	extends Omit<StorefrontClientParams, 'exchanges'> {
	afterSubscriptions?: AfterSubscriptions;
}
