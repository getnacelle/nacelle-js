import { StorefrontClient } from './client/index.js';
import { errorMessages } from './utils/index.js';

import CommerceQuery from '@nacelle/storefront-sdk-plugin-commerce-queries';

import type { StorefrontResponse } from './client/index.js';
import type { WithConfig, WithStorefrontQuery } from './types/plugins.js';
import type { CommerceQueriesInterface } from '@nacelle/storefront-sdk-plugin-commerce-queries';

export interface StorefrontClientAdvancedOptions {
	/**
	 * Controls whether or not Automatic Persisted Queries should be enabled when making requests. This is enabled by default and allows Nacelle to provide improved performance for repeated queries.
	 * @defaultvalue true
	 */
	enableApq?: boolean;
}

export interface StorefrontClientParams {
	/** Nacelle Storefront GraphQL Endpoint. This can be retrieved from the Nacelle Dashboard. */
	storefrontEndpoint: string;

	/** Nacelle Preview Token. This can be retrieved from the Nacelle Dashboard. */
	previewToken?: string;

	/** An IETF locale string, e.g. 'en-US'.  */
	locale?: string;

	/** Optional fetch implementation. If not supplied, the Storefront SDK will use `globalThis.fetch`. */
	fetchClient?: typeof globalThis.fetch;

	/** Advanced options for configuring the Storefront SDK. These default to the recommended settings for most users. */
	advancedOptions?: StorefrontClientAdvancedOptions;
}

type SdkInstance = WithConfig & WithStorefrontQuery;
// type Mixin<T extends BaseStorefrontClient = BaseStorefrontClient, Q = any> = (
// 	i: new (...args: any[]) => T
// ) => new (...args: any[]) => T & Q;

// type MixinRest<T extends Mixin[]> = {
// 	[P in keyof T]: T[P] extends T[number] ? Mixin<T[P], infer Q> : never;
// };

// type MixinInstance<R> = R extends Mixin<infer T, infer Q> ? unknown : never;

interface NacelleSdkPlugin<S, BaseClass extends SdkInstance> {
	createPlugin(base: BaseClass): new (...args: any[]) => S;
}

class CommerceQueriesPlugin<BaseClass extends SdkInstance>
	implements NacelleSdkPlugin<CommerceQueriesInterface, BaseClass>
{
	createPlugin(base: BaseClass) {
		return CommerceQuery(base);
	}
}

interface Query2 {
	Query2(): Promise<any>;
}

function Query2Mixin<TBase extends SdkInstance>(Base: TBase) {
	return class Query2Mixin extends Base implements Query2 {
		Query2(): Promise<any> {
			return this.query({ query: '' });
		}
	};
}

class Query2Plugin<BaseClass extends SdkInstance>
	implements NacelleSdkPlugin<Query2, BaseClass>
{
	createPlugin(base: BaseClass): new (...args: any[]) => Query2 {
		return Query2Mixin(base);
	}
}

// class StorefrontClient<Plugins extends NacelleSdkPlugin[] = []> {
// 	registerPlugin<P extends NacelleSdkPlugin>(
// 		plugin: P
// 	): asserts this is StorefrontClient<[...Plugins, P]> {
// 		true;
// 	}
// }

function registerPlugin<P extends NacelleSdkPlugin<I, SdkInstance>, I>(
	plugin: P,
	instance: SdkInstance
): asserts instance is SdkInstance & (new (...args: any[]) => I) {
	plugin !== undefined && instance !== undefined;
}

function applyPlugin<P extends NacelleSdkPlugin<I, SdkInstance>, I>(
	plugin: P,
	instance: SdkInstance
) {
	const myPlugin = plugin.createPlugin(instance);
	registerPlugin(plugin, myPlugin);
	return myPlugin;
}

const creator = applyPlugin<
	CommerceQueriesPlugin<typeof StorefrontClient>,
	CommerceQueriesInterface
>(CommerceQueriesPlugin, StorefrontClient);

const thing = new creator({
	storefrontEndpoint: 'http://google.com'
} as StorefrontClientParams);

export function Storefront<T extends any[]>(params: StorefrontClientParams) {
	if (!params?.storefrontEndpoint) {
		throw new Error(errorMessages.missingEndpoint);
	}

	// const test = plugins?.[0](BaseStorefrontClient);
	// const q = new test(params);
	// let clientConstructor = plugins?.[0](StorefrontClient) ?? StorefrontClient;

	// if (plugins && plugins.length) {
	// 	for (const plugin of plugins) {
	// 		clientConstructor = plugin(clientConstructor);
	// 	}
	// }

	// return new clientConstructor(params);
}

// const triangle = new (b(StorefrontClient))({
// 	storefrontEndpoint: 'https://google.com'
// });

// triangle;

// const s = Storefront(
// 	{ storefrontEndpoint: 'http://localhost:3000' },
// 	CommerceQuery
// );

// s;

// type idea = (num: number) => number;

// const test_idea = (num: number): number => {
// 	return num + 1;
// };

// const idea_fn: (f: idea) => number = (f: idea): number => {
// 	return f(2);
// };

// const out = idea_fn(test_idea);

export { StorefrontClient, StorefrontResponse };
export * from './types/plugins.js';
