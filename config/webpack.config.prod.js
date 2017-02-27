const webpack           = require('webpack');
const smartMerge        = require('webpack-merge').smart;
const base              = require('./webpack.config.base.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const inline            = require('inline-manifest-webpack-plugin');

module.exports = smartMerge(base, {
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('style.[chunkhash].css'),
    new inline,
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'resolve-url-loader']
        })
      }
    ]
  }
});
