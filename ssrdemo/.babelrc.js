const presets = [
  "@babel/preset-env",
  "@babel/preset-react"
];

const plugins = [
  [
    "@babel/plugin-transform-runtime",
    {
      "corejs": 3,
      "version": "7.8.7"
    }
  ]
];

module.exports = { presets, plugins };