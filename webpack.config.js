var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.tsx'
  ],
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: [
          'react-hot-loader',
          'babel-loader?presets[]=es2015',
          'awesome-typescript-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};