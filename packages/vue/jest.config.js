module.exports = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
    '^mocks/(.*)$': '<rootDir>/mocks/$1',
    '^vue$': 'vue/dist/vue.common.prod.js'
  },
  testEnvironment: 'jsdom',
  transform: {
    '.*\\.(vue)$': '@vue/vue2-jest',
    '.*\\.(js)$': 'babel-jest'
  }
};
