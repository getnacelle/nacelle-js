import { dataFetchingMethods } from '../utils/index.js';

function unexpectedInputMessage(
	/** The name of the method where the unexpected input was provided */
	methodName: string,

	/** A quick description of what the expected input is */
	expectedInputDescription: string,

	/** The actual input that was received */
	received: unknown
): string {
	return `[@nacelle/storefront-sdk|${methodName} method] ${expectedInputDescription}. Received: ${JSON.stringify(
		received
	)}.
	}`;
}

export const errorMessages = {
	missingEndpoint:
		"@nacelle/storefront-sdk must be initialized with a 'storefrontEndpoint'.",
	afterMethodInvalid: (received: unknown) =>
		unexpectedInputMessage(
			'after',
			`valid 'method' names are: ${dataFetchingMethods.join(', ')}.`,
			received
		),
	afterMethodCallbackIdInvalid: (received: unknown) =>
		unexpectedInputMessage(
			'after',
			'callback IDs are expected to be strings',
			received
		),
	afterMethodCallbackInvalid: (received: unknown) =>
		unexpectedInputMessage(
			'after',
			'provided callbacks are expected to be functions or null',
			received
		)
} as const;
