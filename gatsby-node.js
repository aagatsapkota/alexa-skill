require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  ignore: [/node_modules/]
})

module.exports = require(`./gatsby-node.es6.js`)
