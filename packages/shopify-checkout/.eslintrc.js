const path = require('path');

module.exports = {
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['~', path.resolve(__dirname, 'src')],
          ['mocks', path.resolve(__dirname, 'mocks')]
        ],
        extensions: ['.ts']
      }
    }
  }
};
