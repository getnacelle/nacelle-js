import type {
	WithStorefrontQuery,
	StorefrontClient,
	StorefrontResponse
} from '@nacelle/storefront-sdk';
import { SpacePropertiesDocument } from './types/storefront.js';
import type { SpaceProperties } from './types/storefront.js';

function commerceQueriesPlugin<TBase extends WithStorefrontQuery>(Base: TBase) {
	return class CommerceQueries extends Base {
		async spaceProperties(): Promise<StorefrontResponse<SpaceProperties>> {
			const queryResponse = await this.query({
				query: SpacePropertiesDocument
			});

			if (queryResponse.error) {
				return queryResponse as StorefrontResponse<SpaceProperties>;
			}

			const spaceProperties = queryResponse.data
				?.spaceProperties as SpaceProperties;

			return {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				data: await (this as unknown as StorefrontClient)['applyAfter'](
					'spaceProperties',
					spaceProperties
				)
			} as StorefrontResponse<SpaceProperties>;
		}
	};
}

export default commerceQueriesPlugin;
