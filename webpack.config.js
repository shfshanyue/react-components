module.exports = {
  entry: './index.js',

  output: {
    filename: 'bundle.js',
    publicPath: ''
  },

  devtool: 'cheap-module-eval-source-map',

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react', 'stage-2'],
      }
    }]
  },

  devServer: {
    port: 8000
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
