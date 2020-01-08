const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const path = require('path');

const devConfig = {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, "../src"),
    publicPath: '/',
    host: "127.0.0.1",
    port: "8888",
    // hot: true,  
    stats: 'errors-only',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),    
  ],
  devtool: 'source-map',
};

module.exports = merge(baseConfig, devConfig);
