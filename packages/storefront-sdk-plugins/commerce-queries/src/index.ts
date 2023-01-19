import type { WithStorefrontQuery } from '@nacelle/storefront-sdk';
import type { SpaceProperties } from './types/storefront.js';
import spaceProperties from './graphql/queries/spaceProperties.js';

function commerceQueriesPlugin<TBase extends WithStorefrontQuery>(Base: TBase) {
	return class CommerceQueries extends Base {
		// methods will go here

		async spaceProperties(): Promise<SpaceProperties> {
			const results = await this.query({ query: spaceProperties });
			return results as SpaceProperties;
		}

		placeholder() {
			return null;
		}
	};
}

export default commerceQueriesPlugin;
