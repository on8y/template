const path = require('path');
//引入插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/web/client.js', //入口文件
  output: {
    filename: 'js/[name].[contenthash:8].bundle.js',
    path: path.resolve(__dirname, 'build/web')
  },
  //配置插件
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'HTML页面标题', //替换index.html的title标签内容
      template: './public/index.html', //html模版的位置
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' }, //使用babel
        ]
      }
    ]
  }
};