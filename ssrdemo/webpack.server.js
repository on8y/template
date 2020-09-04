const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
//引入插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './src/server/server.js', //入口文件
  //配置插件
  plugins: [
    new CleanWebpackPlugin(),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build/server'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react"
              ]
            }
          }, //使用babel
        ]
      }
    ]
  },
  externals: [webpackNodeExternals()]
};