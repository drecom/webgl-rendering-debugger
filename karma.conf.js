const path = require('path');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],

    preprocessors: {
      'test/**/*.js': ['webpack'],
    },

    // files
    files: [
      'lib/webgl-rendering-debugger.js',
      'test/index.js',
    ],
    exclude: [
    ],

    // logs
    reporters: ['mocha'],
    colors: true,
    logLevel: config.LOG_ERROR,

    // browser
    browsers: ['HeadlessCustomizedChrome'],
    port: 9876,
    concurrency: Infinity,
    customLaunchers: {
      HeadlessCustomizedChrome: {
        base: 'Chrome',
        flags: [
          '--nosandbox',
          '--headless',
          '--remote-debugging-port=9222',
        ],
      },
    },

    // watch
    autoWatch: false,
    singleRun: true,

    // webpack preprocessor config
    webpack: {
      mode: 'development',

      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [
              { loader: 'ts-loader' }
            ]
          }
        ]
      },
      resolve: {
        extensions: ['.ts', '.js'],
        modules: [
          path.resolve('./src'),
          "node_modules"
        ]
      },
      node: {
        fs: 'empty',
        child_process: 'empty'
      },
    },
  });
};
