const path = require("path");
const webpack = require('webpack');
//引入插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production'
console.log('============== process.env.BROWSER', process.env.BROWSER)

module.exports = {
  // target: "electron-renderer",
  mode: process.env.NODE_ENV,
  entry: "./src/index.js", //入口文件
  devtool: isProd ? '' : 'source-map',
  //配置加载器
  module: {
    rules: [
      { //加载js
        test: /\.js|jsx$/, //匹配 js 文件
        exclude: /node_modules/, //排除文件夹
        use: [
          { loader: 'babel-loader' }, //使用babel
          {
            loader: 'eslint-loader',  // eslint 加载器
            options: {                // eslint 选项
              enforce: 'pre',         //在加载前执行
              fix: true,              //自动修复
              include: [path.resolve(__dirname, 'src')], //指定检查的目录
              formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
            }
          },
        ]
      },
      { // 加载 css
        test: /\.css$/,
        exclude: [/node_modules/, /\.module\.css$/], //排除 node_modules 和 css module
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          'postcss-loader'
        ],
      },
      { //加载css module
        test: /\.module\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              },
            }
          },
          'postcss-loader'
        ]
      },
      { //加载图片
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: ['file-loader'], //或者
        use: [
          {
            loader: 'url-loader',
            options: {
              outputPath: 'imgs/', //输出路径
              name: '[name]-[hash:5].[ext]', //文件名
              limit: 8192, //超过限制会使用file-loader
              esModule: false, //支持 require("imgUrl") 方式
            }
          }
        ]
      },
      { //加载字体
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      { //加载csv tsv
        test: /\.(csv|tsv)$/,
        use: ['csv-loader'],
      },
      { //加载xml
        test: /\.xml$/,
        use: ['xml-loader'],
      },
      { //加载音频
        test: /\.(mp3)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: 'audios/[name].[ext]',
          limit: 10
        }
      }
    ]
  },
  //配置插件
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Electron-Player', //替换index.html的title标签内容
      template: './public/index.html', //html模版的位置
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
    }),
    new MiniCssExtractPlugin({
      filename: `css/[name]${isProd ? '.[contenthash:8]' : ''}.css`,
      chunkFilename: `css/[id]${isProd ? '.[contenthash:8]' : ''}.css`,
      ignoreOrder: false,
    }),
  ],
  output: {
    filename: `js/[name]${isProd ? '.[hash:8]' : ''}.bundle.js`, //出口文件
    path: path.resolve(__dirname, "dist") //输出路径
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    alias: { 'react-dom': '@hot-loader/react-dom' } //消除提示文字
  },
  devServer: {
    contentBase: './dist', //内容目录
    open: 'Google Chrome', //设置启动的浏览器
    port: 3080, //启动端口
    hot: true //支持热更新
  }
};