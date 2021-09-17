module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['js', 'json'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
    '^mocks/(.*)$': '<rootDir>/mocks/$1'
  },
  testEnvironment: 'jsdom'
};
