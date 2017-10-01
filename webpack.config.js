//var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var webpack = require('webpack');
var fs      = require('fs');
var path    = require('path');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  entry   : './react-dev/router.js',
  devtool : 'eval',

  // Put the generated file into the assest folder for Jekyll to use.
  output: {
    filename : 'bundle.js',
    path     : 'src/_assets/js/',
  },
    module: {
      loaders: [
        {
          test    : /\.jsx?$/,
          exclude : /(node_modules)/,
          loader  : 'babel',
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
      plugins: [
        new webpack.DefinePlugin({ 
          'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8880
        })
      ]
    },
    resolve: {
      extensions: ['', '.js', '.jsx'] 
    },
    devServer: {
      historyApiFallback : true,
      contentBase        : './react-dev/'
    },
    node: {
      console : true,
      fs      : 'empty'
    }
};