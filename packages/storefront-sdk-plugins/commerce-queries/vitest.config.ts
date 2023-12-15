export default {
	test: {
		coverage: {
			enabled: true,
			include: ['src/**/*.ts'],
			provider: 'v8',
			reportsDirectory: 'coverage',
			reporter: ['text', 'lcov'],
			exclude: [
				'src/types/**.ts',
				'src/graphql/documents.ts',
				'**/*.test.ts',
				'node_modules/**'
			]
		},
		environment: 'jsdom',
		typecheck: {
			include: ['**/*.test.ts']
		},
		setupFiles: ['vitest.setup.ts']
	}
};
