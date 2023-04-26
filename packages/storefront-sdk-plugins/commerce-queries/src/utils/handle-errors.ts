import type { StorefrontResponse } from '@nacelle/storefront-sdk';

type CombinedError = StorefrontResponse<unknown>['error'];

const handleErrors = (error?: CombinedError): void => {
	throw new Error(error?.message);
};

export default handleErrors;
