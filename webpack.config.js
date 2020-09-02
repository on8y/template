const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

console.log();
console.log(`运行环境 > ${process.env.NODE_ENV}`);
console.log();

module.exports = [
  {
    mode: process.env.NODE_ENV,
    entry: "./src/web/index.js", //入口文件
    output: {
      filename: "js/[name].[hash:8].bundle.js", //出口文件
      path: path.resolve(__dirname, "dist/web") //输出路径
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'HTML页面标题', //替换index.html的title标签内容
        template: './public/index.html', //html模版的位置
      })
    ],
    module: {
      rules: [
        {
          test: /\.js|jsx$/, //匹配 js 文件
          exclude: /node_modules/, //排除文件夹
          use: [
            { loader: 'babel-loader' }, //使用babel
          ]
        },
      ]
    },
  },
  {
    mode: process.env.NODE_ENV,
    entry: "./src/server/app.js", //入口文件
    output: {
      filename: "[name].bundle.js", //出口文件
      path: path.resolve(__dirname, "dist/server") //输出路径
    },
    plugins: [
      new CleanWebpackPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.js|jsx$/, //匹配 js 文件
          exclude: /node_modules/, //排除文件夹
          use: [
            { loader: 'babel-loader' }, //使用babel
          ]
        },
      ]
    },
  }
];