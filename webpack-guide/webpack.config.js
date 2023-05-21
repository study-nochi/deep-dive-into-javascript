const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: {
      import: "./src/index.js",
      dependOn: 'shared',
    },
    another: {
      import: "./src/another-modules.js",
      dependOn: 'shared'
    },
    shared: 'lodash',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    runtimeChunk: 'single',
  },
};