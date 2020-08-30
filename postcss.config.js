module.exports = ({ file, options, env }) => ({
  parser: require('postcss-scss'),
  plugins: [
    require('postcss-import'),
    require('postcss-normalize')({
      forceImport:true, //强制插入
      browsers: 'last 2 versions' //浏览器近2个版本
    }),
    //支持“现代css”(Sass,Scss)语法，并转成 css
    require('precss'),
    //编译前计算
    require('postcss-calc'),
    //px 转 rem
    require('postcss-plugin-px2rem')({ rootValue: 16, minPixelValue: 2 }),
  //压缩css，去除所有注释
    require('cssnano')({
      preset: ['default', { discardComments: { removeAll: true } }]
    })
  ]
});