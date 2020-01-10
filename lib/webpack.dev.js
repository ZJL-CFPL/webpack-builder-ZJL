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
    proxy: {
      '/api': {
        target: 'http://10.3.23.180/api',
        pathRewrite: { '^/api': '' },
        changeOrigin: true, // target是域名的话，需要这个参数，
        secure: false // 设置支持https协议的代理
      }
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),    
  ],
  devtool: 'source-map',
};

module.exports = merge(baseConfig, devConfig);
