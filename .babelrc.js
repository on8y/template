const presets = [
	"@babel/preset-env",
	"@babel/preset-react"
];

const plugins = [
  [
    "@babel/plugin-transform-runtime", //避免全局污染，支持新功能
    {
      corejs: 3,
      version: "7.8.7" //版本支持越高，支持的新功能越多
    }
  ]
];

module.exports = { presets, plugins };