const glob = require('glob');
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');// 拷贝静态资源

const projectRoot = process.cwd();
const devMode = process.env.NODE_ENV !== 'production';
console.log(devMode,process.env.NODE_ENV);
const proRoot = process.cwd() // 当前执行node命令时候的文件夹目录名
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(projectRoot, './src/pages/**/index.js'));
  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/pages\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
    return htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, `./src/pages/${pageName}/index.ejs`),
        filename: `${pageName}.html`,
        // favicon: './src/assets/img/favicon.ico',// 子目录时候路径配置有问题
        chunks: ['common', pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      }),
    );
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
};

const {
  entry,
  htmlWebpackPlugins,
} = setMPA();
// console.log(entry);

module.exports = {
  entry: entry,
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: 'assets/js/[name]_[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: 'babel-loader',
        exclude: /node_modules/, // exclude设置哪些目录下的文件不进行处理
        include: path.resolve(__dirname, 'src') // include精确指定只处理哪些目录下的文件
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options:{
              hmr:devMode,
              reloadAll: true,
              publicPath: '../../',
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
          // { // 手机端采用rem布局
          //   loader: 'px2rem-loader',
          //   options: {
          //     remUnit: 75,
          //     remPrecision: 8,
          //   },
          // },
        ],
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/images',
          },
        },
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/fonts',
          },
        },
      }, 
      // {
      //   test: /\.(htm|html)$/,
      //   use: [
      //     {
      //       loader: 'html-loader',
      //       options: {
      //         attrs: ['img:src', 'img:data-src']
      //       }
      //     }
      //   ],
      // },
      {
        test: /\.ejs$/,
        use: [
          {
            loader: 'ejs-loader?variable=data'
          },
        ]
      },
      // {
      //   test: /\.ejs$/,
      //   use: [
      //     {
      //       loader: 'html-loader', // 使用 html-loader 处理图片资源的引用
      //       options: {
      //         attrs: ['img:src', 'img:data-src']
      //       }
      //     },
      //     {
      //       loader: 'ejs-html-loader', // 使用 ejs-html-loader 处理 .ejs 文件的 includes 语法
      //       options: {
      //         production: process.env.ENV === 'production'
      //       }
      //     }
      //   ]
      // }
    ],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new CopyPlugin([ // 拷贝静态资源
      { from: path.join(proRoot,'./src/plugin'), to: path.join(proRoot,'./dist/plugin') },
      { from: path.join(proRoot,'./src/assets/img'), to: path.join(proRoot,'./dist/assets/images') },
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.ProvidePlugin({
      // $_: 'jquery',
      _axios: 'axios',
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : 'assets/css/[name].[hash:8].css',
    }),
    function errorPlugin() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          process.exit(1);
        }
      });
    },
  ].concat(htmlWebpackPlugins),
  stats: 'errors-only',
  performance: { // 文件打包文件大小控制
    hints: "warning", // 枚举
    maxAssetSize: 30000000, // 整数类型（以字节为单位）
    maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
    assetFilter: function(assetFilename) {
    // 提供资源文件名的断言函数
    return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    
    }
  }
};