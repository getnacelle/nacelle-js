import type {
	WithStorefrontQuery,
	StorefrontClient,
	StorefrontResponse
} from '@nacelle/storefront-sdk';
import {
	SpacePropertiesDocument,
	NavigationDocument
} from './types/storefront.js';
import type {
	SpaceProperties,
	NavigationGroup,
	NavigationFilterInput
} from './types/storefront.js';

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

		async navigation(
			params?: NavigationFilterInput
		): Promise<StorefrontResponse<Array<NavigationGroup>>> {
			const queryResponse = await this.query({
				query: NavigationDocument,
				variables: { filter: params }
			});

			if (queryResponse.error) {
				return { ...queryResponse } as StorefrontResponse<NavigationGroup[]>;
			}

			const navigation = queryResponse.data
				?.navigation as Array<NavigationGroup>;

			return {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				data: await (this as unknown as StorefrontClient)['applyAfter'](
					'navigation',
					navigation
				)
			} as StorefrontResponse<Array<NavigationGroup>>;
		}
	};
}

export default commerceQueriesPlugin;
