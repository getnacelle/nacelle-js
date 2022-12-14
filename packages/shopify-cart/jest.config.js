/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  coverageReporters: ['text', 'lcov'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['node_modules', '__tests__']
};
