import type { StorefrontResponse } from '@nacelle/storefront-sdk';
import type { GraphQLError } from 'graphql';

type CombinedError = StorefrontResponse<unknown>['error'];

const handleErrors = (error?: CombinedError): void => {
	if (error?.graphQLErrors && error?.graphQLErrors.length) {
		handleGraphqlErrors(error?.graphQLErrors);
	} else {
		throw new Error(error?.message);
	}
};

const handleGraphqlErrors = (errors?: GraphQLError[]): void => {
	let errorMessage = 'Storefront GraphQL Error:';
	if (errors && errors.length > 0) {
		const { otherErrors, complexityErrors } = errors.reduce(
			(categories, error) => {
				switch (error.extensions?.code) {
					case 'COMPLEXITY_ERROR':
						categories.complexityErrors.push(error);
						break;
					default:
						categories.otherErrors.push(error);
						break;
				}
				return categories;
			},
			{ otherErrors: [], complexityErrors: [] } as {
				otherErrors: GraphQLError[];
				complexityErrors: GraphQLError[];
			}
		);

		if (complexityErrors.length > 0) {
			const { message, extensions } = complexityErrors[0];
			throw new Error(`${message}/${JSON.stringify(extensions)}`);
		}

		otherErrors.forEach((error, index, arr) => {
			const { nacelleErrorId, failedEntries } = error.extensions;
			const displayIndex =
				arr.length > 1 ? ` (${index + 1} of ${arr.length}) ` : '';
			const displayErrorId = nacelleErrorId
				? ` (Error Ref Id: ${JSON.stringify(nacelleErrorId)})`
				: '';
			const stringifiedFailedEntries = failedEntries
				? ` - Error Details: ${JSON.stringify(failedEntries)}`
				: '';
			errorMessage += `${displayIndex}${error.message}${displayErrorId}${stringifiedFailedEntries}`;
		});

		throw new Error(errorMessage);
	}
};

export default handleErrors;
