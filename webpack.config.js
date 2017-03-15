const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    app: './index.js'
  },

  output: {
    filename: '[name].[id].[chunkhash:5].js',
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

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = 'source-map'
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production') 
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false  
      },
      output: {
        screw_ie8: true,
        comments: false
      },
      sourcemap: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module, count) {
        return module.resource && /\.js$/.test(module.resource) && module.resource.includes('node_modules') 
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]  
}
