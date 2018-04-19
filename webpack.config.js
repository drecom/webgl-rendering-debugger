const webpack = require('webpack');
const path    = require('path');

const plugins = [
  // compressing
  new webpack.optimize.OccurrenceOrderPlugin(),
  // compressing
  new webpack.optimize.AggressiveMergingPlugin()
];

module.exports = {
  entry: {
    index: path.join(__dirname, 'src', 'index.ts'),
  },

  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'webgl-rendering-debugger.js',
    library: 'webgl-rendering-debugger',
    libraryTarget: 'umd'
  },

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
    extensions: ['.ts'],
    modules: [
      path.resolve('./src'),
      "node_modules"
    ]
  },

  node: {
    fs: 'empty'
  },

  devtool: false,
  plugins: plugins
};
