require('dotenv-flow').config({
  node_env: process.env.SITE_ENV || process.env.NODE_ENV || 'development',
})
require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  ignore: [/node_modules/]
})

module.exports = require(`./gatsby-config.es6.js`)
