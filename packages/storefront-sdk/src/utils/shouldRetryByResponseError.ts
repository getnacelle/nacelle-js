import type { CombinedError } from '@urql/core';
import { COMPLEXITY_ERROR_CODE } from './constants.js';

export function shouldRetryByResponseError(error: CombinedError) {
	return error.graphQLErrors.some((graphqlError) => {
		if (graphqlError.extensions?.code === COMPLEXITY_ERROR_CODE) {
			const requestedQueryCost =
				graphqlError.extensions?.requestedQueryCost ?? 0;

			const throttleStatus: { totalCapacity?: number } = graphqlError.extensions
				?.throttleStatus ?? {
				totalCapacity: 0
			};

			const totalCapacity = throttleStatus?.totalCapacity ?? 0;

			// Only retry query complexity error when requested query cost is lower than total capacity
			// The idea is to give time to leaky bucket algorithm to drain necessary space to support requested query cost
			// We don't want to retry when requested cost is bigger than total capacity because it will fail on every attempt
			const shouldRetryComplexityError = totalCapacity > requestedQueryCost;
			return shouldRetryComplexityError;
		}
		return false;
	});
}
