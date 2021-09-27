/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
    '^__tests__/(.*)$': '<rootDir>/__tests__/$1'
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['node_modules', 'mocks', 'utils']
};
