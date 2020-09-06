const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpackNodeExternals = require("webpack-node-externals");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  target: "node",
  mode: process.env.NODE_ENV,
  entry: "./src/server/index.js", //入口文件
  output: {
    filename: `[name].bundle.js`, //出口文件
    path: path.resolve(__dirname, "dist/server"), //输出路径
  },
  externals: [webpackNodeExternals()],
  plugins: [new CleanWebpackPlugin()],
  //配置加载器
  module: {
    rules: [
      {
        test: /\.js|jsx|ts|tsx$/, //匹配 js 文件
        exclude: /node_modules/, //排除文件夹
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                // "@babel/preset-typescript"
              ],
            },
          }, //使用babel
        ],
      },
    ],
  }
};
