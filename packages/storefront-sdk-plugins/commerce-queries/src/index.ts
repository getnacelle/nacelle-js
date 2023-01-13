import type { WithStorefrontQuery } from '@nacelle/storefront-sdk';

function commerceQueriesPlugin<TBase extends WithStorefrontQuery>(Base: TBase) {
	return class CommerceQueries extends Base {
		// methods will go here
		placeholder() {
			return null;
		}
	};
}

export default commerceQueriesPlugin;
