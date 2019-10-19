const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  devServer: {
    contentBase: './src',
    publicPath: '/',
    host: "127.0.0.1",
    port: "8888",
    // hot: true,  //有问题，注释后可以实现html热更新。奇怪了。。。。。。。。。
    stats: 'errors-only',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),    
  ],
  devtool: 'source-map',
};

module.exports = merge(baseConfig, devConfig);
