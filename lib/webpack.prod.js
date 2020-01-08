const merge = require('webpack-merge');
const cssnano = require('cssnano');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base');
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin');

const prodConfig = {
  mode: 'production',
  plugins: [
    // new OptimizeCssAssetsPlugin({ // minicssextral好像有压缩操作，待完善
    //   assetNameRegExp: /.css$/g,
    //   cssProcessor: cssnano,
    //   cssProcessorPluginOptions: {
    //     preset: [  'default', {
    //         discardComments: { removeAll: true}, //对注释的处理
    //         normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
    //     }]
    //   },
    //   canPrint: true  // 是否打印编译过程中的日志
    // }),
   
    new CleanWebpackPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0, // 表示在压缩前的最小模块大小，默认为30000
      maxSize: 0, // 表示抽取出来的文件在压缩前的最大大小，默认为 0，表示不限制最大大小；
      minChunks: 2, // 表示被引用次数，默认为1
      // maxAsyncRequests: 5, // 最大的按需(异步)加载次数，默认为 5；
      name: true, // 拆分出来块的名字，默认由块名和hash值自动生成
      // maxInitialRequests:最大的初始化加载次数，默认为 3；
      // automaticNameDelimiter: //抽取出来的文件的自动生成名字的分割符，默认为 ~；

      cacheGroups: { // cacheGroups 才是我们配置的关键。它可以继承/覆盖上面 splitChunks 中所有的参数值
        // commons: {
        //   // test:/[\\/]node_modules[\\/]/,
        //   name: 'common',
        //   chunks: 'all',
        //   priority: 2, // 表示抽取权重，数字越大表示优先级越高。因为一个 module 可能会满足多个 cacheGroups 的条件，那么抽取到哪个就由权重最高的说了算；
        //   minChunks: 2,
        // },
        vendor: { // 第三方库打包出vendor（基本不变）
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
          priority: 2,
          minChunks: 2
        },
        common: { // 引用两次以上的模块打包出common （变化较少）
          test: /.js$/,
          name: 'common',
          chunks: 'initial',
          priority: 1,
          minChunks: 2
        },
        // 对于通过 MiniCssExtractPlugin 生成的 CSS 文件也可以通过 SplitChunks 来进行抽取公有样式等。
        styles: { // 表示将所有 CSS 文件打包为一个（注意将权重设置为最高，不然可能其他的 cacheGroups 会提前打包一部分样式文件）
          test: /\.css$/,
          name: 'styles',
          chunks: 'all',
          enforce: true,
          priority: 20, 
        }
      },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);
