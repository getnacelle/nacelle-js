import type { dataFetchingMethods } from './constants.js';

export const highEntriesPerPageMessage =
	'You have set the `entriesPerPage` option to a high value. We recommended keeping this value small for collections to avoid issues.';

type DataFetchingMethod = typeof dataFetchingMethods[number];
export const entryIdsAndHandlesMessage = (methodName: DataFetchingMethod) =>
	`You have supplied both a nacelleEntryIds and handles. The ${methodName} method will use nacelleEntryIds for querying.`;
