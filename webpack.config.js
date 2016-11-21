var path = require('path')
var webpack = require('webpack')

var {getIfUtils, removeEmpty} = require('webpack-config-utils')
var {ifProduction, ifNotProduction} = getIfUtils(process.env.NODE_ENV || 'development')

var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    main: ['whatwg-fetch', path.resolve(__dirname, 'src', 'main.js')]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }]
      }, {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        use: ifNotProduction(['style-loader', 'css-loader']),
        loader: ifProduction(ExtractTextPlugin.extract('css-loader'))
      }
    ]
  },
  plugins: removeEmpty([
    ifProduction(new ExtractTextPlugin('style.css')),
    ifProduction(new webpack.optimize.UglifyJsPlugin())
  ])
}
