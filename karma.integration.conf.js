/*eslint-env node*/
var path = require('path');

var TEST_FILES = 'test/integration/*Spec.js';

module.exports = function(config) {
  config.set({

    files: [
      TEST_FILES
    ],

    frameworks: ['jasmine'],

    browsers: ['Firefox'],

    preprocessors: {
      'test/integration/*Spec.js': ['webpack'] //FIXME how do we re-use a constant here?
    },

    webpack: {
      module: {
        loaders: [
          { test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel?optional[]=runtime' }
        ]
      },
      resolve:
        {
          root: path.join(__dirname, 'src')
        }
    },

    reporters: ['mocha'],

    singleRun: true

  });
};
