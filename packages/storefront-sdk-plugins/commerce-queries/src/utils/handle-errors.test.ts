import { expect, it, describe } from 'vitest';
import handleErrors from './handle-errors.js';

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
});
