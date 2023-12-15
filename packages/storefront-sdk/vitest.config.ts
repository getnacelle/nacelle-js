export default {
	test: {
		coverage: {
			enabled: true,
			include: ['src/**/*.ts'],
			provider: 'v8',
			reportsDirectory: 'coverage',
			reporter: ['text', 'lcov']
		},
		environment: 'jsdom',
		typecheck: {
			include: ['**/*.test.ts']
		},
		setupFiles: ['vitest.setup.ts']
	}
};
