//var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var webpack = require('webpack');
var fs      = require('fs');
var path    = require('path');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  entry   : './react/router.js',
  devtool : 'eval',

  // Put the generated file into the assest folder for Jekyll to use.
  output: {
    filename : 'bundle.js',
    path     : __dirname + '/public/assets/js/',
  },
    module: {
      loaders: [
        {
          test    : /\.jsx?$/,
          exclude : /(node_modules)/,
          loader  : 'babel-loader',
          query   : {
            presets: ['react', 'es2015', 'stage-1']
          }
        },
        {
          test   : /\.json$/,
          loader : 'json-loader' 
        },
        {
          test    : /\.css$/,
          loader  : 'style!css?modules',
          include : /flexboxgrid/,
        },
       ],
      },
      plugins: [
        new webpack.DefinePlugin({ 
          'process.env.NODE_ENV': '"development"'
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8880
        })
      ],
    resolve: {
      extensions: ['.js', '.jsx'] 
    },
    devServer: {
      historyApiFallback : true,
      contentBase        : './react/'
    },
    node: {
      console : true,
      fs      : 'empty'
    }
};