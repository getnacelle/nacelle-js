module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	env: {
		es2022: true,
		jest: true,
		node: true
	},
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:jest-formatting/recommended',
		'prettier'
	],
	parserOptions: {
		ecmaVersion: 'latest',
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json']
	},
	rules: {},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts']
		}
	},
	ignorePatterns: [
		'.eslintrc.cjs',
		'jest.config.ts',
		'node_modules',
		'.prettierrc',
		'build',
		'dist'
	]
};
