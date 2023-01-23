// import { applyAfter } from '@nacelle/storefront-sdk';
import type { WithStorefrontQuery } from '@nacelle/storefront-sdk';
import type { SpaceProperties } from './types/storefront.js';
import spaceProperties from './graphql/queries/spaceProperties.js';

function commerceQueriesPlugin<TBase extends WithStorefrontQuery>(Base: TBase) {
	return class CommerceQueries extends Base {
		// methods will go here

		async spaceProperties(): Promise<SpaceProperties | object> {
			const {
				data,
				error
			}: { data?: { spaceProperty: SpaceProperties }; error?: object } =
				await this.query({ query: spaceProperties });

			return error ? error : data?.spaceProperty || {};
		}

		placeholder() {
			return null;
		}
	};
}

export default commerceQueriesPlugin;
