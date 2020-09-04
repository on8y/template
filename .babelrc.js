const presets = [
  [
    "@babel/preset-env",
    { targets: { "browsers": ["> 1%", "last 2 versions", "not ie <= 8"] } }
  ],
  "@babel/preset-react",
  '@babel/preset-typescript',
];

const plugins = [
  '@babel/plugin-proposal-class-properties',
  [
    "@babel/plugin-transform-runtime", //避免全局污染，支持新功能
    {
      corejs: 3,
      version: "7.11.2" //版本支持越高，支持的新功能越多
    }
  ]
];

module.exports = { presets, plugins };