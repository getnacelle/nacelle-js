import { expect, it, describe } from 'vitest';
import handleErrors from './handle-errors.js';
import { GraphQLError } from 'graphql';

describe('StorefrontConnector Handle Errors', () => {
	describe('handleErrors', () => {
		it('should throw correct message if there is a non GraphQL error', () => {
			const errors = {
				name: 'abc',
				message: 'def',
				graphQLErrors: []
			};
			expect(() => {
				handleErrors(errors);
			}).toThrowError(`def`);
		});
	});

	describe('handleGraphQLErrors()', () => {
		it('should concatenate other GraphQL errors in the thrown error message', () => {
			const errors = {
				name: 'abc',
				message: 'def',
				graphQLErrors: [
					new GraphQLError(
						'Cannot query field "createdA" on type "Product". Did you mean "createdAt" or "updatedAt"?',
						{
							extensions: { code: 'GRAPHQL_VALIDATION_FAILED' }
						}
					),
					new GraphQLError(
						'Cannot query field "indexedA" on type "Product". Did you mean "indexedAt"?',
						{
							extensions: { code: 'GRAPHQL_VALIDATION_FAILED' }
						}
					)
				]
			};

			expect(() => {
				handleErrors(errors);
			}).toThrow(
				`Storefront GraphQL Error: (1 of 2) Cannot query field "createdA" on type "Product". Did you mean "createdAt" or "updatedAt"? (2 of 2) Cannot query field "indexedA" on type "Product". Did you mean "indexedAt"?`
			);
		});

		it('should include nacelleErrorId if it exists in the error extensions', () => {
			const errors = {
				name: 'abc',
				message: 'def',
				graphQLErrors: [
					new GraphQLError(
						'Cannot query field "createdA" on type "Product". Did you mean "createdAt" or "updatedAt"?',
						{
							extensions: {
								code: 'GRAPHQL_VALIDATION_FAILED',
								nacelleErrorId: 'abc-123'
							}
						}
					)
				]
			};

			expect(() => {
				handleErrors(errors);
			}).toThrow(
				`Storefront GraphQL Error:Cannot query field "createdA" on type "Product". Did you mean "createdAt" or "updatedAt"? (Error Ref Id: "abc-123")`
			);
		});

		it('should not include nacelleErrorId if no extensions have been selected', () => {
			const errors = {
				name: 'abc',
				message: 'def',
				graphQLErrors: [
					new GraphQLError(
						'Cannot query field "createdA" on type "Product". Did you mean "createdAt" or "updatedAt"?'
					)
				]
			};

			expect(() => {
				handleErrors(errors);
			}).toThrow(
				`Storefront GraphQL Error:Cannot query field "createdA" on type "Product". Did you mean "createdAt" or "updatedAt"?`
			);
		});

		it('should include failed entries', () => {
			const failedEntries = [
				{
					message: 'abc-123',
					code: 400
				}
			];
			const errors = {
				name: 'abc',
				message: 'def',

				graphQLErrors: [
					new GraphQLError(
						'Cannot query field "createdA" on type "Product". Did you mean "createdAt" or "updatedAt"?',
						{
							extensions: {
								code: 'GRAPHQL_VALIDATION_FAILED',
								failedEntries
							}
						}
					)
				]
			};

			expect(() => {
				handleErrors(errors);
			}).toThrow(
				`Storefront GraphQL Error:Cannot query field "createdA" on type "Product". Did you mean "createdAt" or "updatedAt"? - Error Details: ${JSON.stringify(
					failedEntries
				)}`
			);
		});
	});
});
