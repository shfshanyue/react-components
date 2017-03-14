const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    app: './index.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/public'
  },

  devtool: 'cheap-module-eval-source-map',

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },

  devServer: {
    port: 8000
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
