const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: "./src/index.js",
  },

  output: {
    filename: 'webpack-numbers.js',
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'this',
    library: {
      name: "webpackNumbers",
      type: 'umd'
    },
    clean: true,
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    }
  }
};