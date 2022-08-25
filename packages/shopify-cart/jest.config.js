/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  coverageReporters: ['text', 'text-summary'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['node_modules', '__tests__']
};
