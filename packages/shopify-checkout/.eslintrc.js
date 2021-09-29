const path = require('path');

module.exports = {
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['~', path.resolve(__dirname, 'src')],
          ['mocks', path.resolve(__dirname, 'mocks')],
          ['__tests__', path.resolve(__dirname, '__tests__')]
        ],
        extensions: ['.ts']
      }
    }
  }
};
