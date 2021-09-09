module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:vue/recommended',
    '@vue/typescript',
    'plugin:nuxt/recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:monorepo/recommended',
    'prettier'
  ],
  ignorePatterns: ['node_modules', 'build', 'dist', 'public'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/react-in-jsx-scope': 'off'
  }
};
