var webpack = require('webpack');
var path    = require('path');
var fs      = require('fs');
var CompressionPlugin = require('compression-webpack-plugin');

const config = {

  entry  : './react/router.js',
  cache  : false,
  devtool: 'cheap-module-source-map',
  output: {
      filename: 'bundle.js',
      path: __dirname + 'public/assets/js/',
  },
  plugins: [
    new webpack.DefinePlugin({ 
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false,
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader' 
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules',
        include: /flexboxgrid/,
      },
     ],
  },
  resolve: {
    extensions: ['.js', '.jsx'] 
  },
  node: {
    console: true,
    fs: 'empty'
  }
};

module.exports = config;