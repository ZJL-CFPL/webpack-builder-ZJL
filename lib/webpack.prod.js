const merge = require('webpack-merge');
const cssnano = require('cssnano');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.base');
const path = require('path');
const proRoot = process.cwd() // 当前执行node命令时候的文件夹目录名

const prodConfig = {
  mode: 'production',
  plugins: [
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /.css$/g,
      cssProcessor: cssnano,
    }),
    new CopyPlugin([
      { from: path.join(proRoot,'./src/assets'), to: path.join(proRoot,'./dist/assets') },
    ]),
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: 'react',
    //       entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
    //       global: 'React',
    //       },
    //     {
    //       module: 'react-dom',
    //       entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
    //       global: 'ReactDOM',
    //     },
    //   ],
    // }),
  ],
  optimization: {
    splitChunks: {
      // chunks: 'all',
      minSize: 0,
      // maxSize: 0,
      // minChunks: 2,
      // maxAsyncRequests: 5,
      // name: true,
      cacheGroups: {
        commons: {
          // test:/(react|react-dom)/,
          name: 'common',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);
