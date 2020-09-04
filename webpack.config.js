const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/web/index.js", //入口文件
  output: {
    filename: `js/[name]${isProd ? ".[hash:8]" : ""}.bundle.js`, //出口文件
    path: path.resolve(__dirname, "dist"), //输出路径
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "HTML页面标题", //替换index.html的title标签内容
      template: "./public/index.html", //html模版的位置
    }),
  ],
  //配置加载器
  module: {
    rules: [
      {
        test: /\.js|jsx$/, //匹配 js 文件
        exclude: /node_modules/, //排除文件夹
        use: [
          { loader: "babel-loader" }, //使用babel
        ],
      },
    ],
  },
  devServer: {
    contentBase: "./dist", //内容目录
    open: "Chrome", //设置启动的浏览器
    port: 3000, //启动端口
  },
};
