'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

// 后端代理 绕过host与referer -begin
//const express = require('express')
//const axios = require('axios')
//const app = express()
//var apiRoutes = express.Router()
//app.use('/api', apiRoutes)
// 后端代理 绕过host与referer -end

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    // 后端代理 绕过host与referer --begin
    // before (app) {
    //   app.get('/api/getHomeFrist', function (req, res) {
    //     var url = 'https://www.musicdo.cn:444/Home/GetHomeFirst'
    //     axios.get(url, {
    //       headers: {
    //         host: 'www.musicdo.cn:444'
    //       },
    //       params: req.query
    //     }).then((response) => {
    //       res.json(response.data)
    //     }).catch((e) => {
    //       console.log(e)
    //     })
    //   })
    //   app.get('/api/getHomeSecond', function (req, res) {
    //     var url = 'https://www.musicdo.cn:444/Home/GetHomeSecond'
    //     axios.get(url, {
    //       headers: {
    //         host: 'www.musicdo.cn:444'
    //       },
    //       params: req.query
    //     }).then((response) => {
    //       res.json(response.data)
    //     }).catch((e) => {
    //       console.log(e)
    //     })
    //   })
    //   app.get('/api/searchProduct', function (req, res) {
    //     var url = 'https://www.musicdo.cn:444/Product/SearchProduct'
    //     axios.get(url, {
    //       headers: {
    //         host: 'www.musicdo.cn:444'
    //       },
    //       params: req.query
    //     }).then((response) => {
    //       res.json(response.data)
    //     }).catch((e) => {
    //       console.log(e)
    //     })
    //   })
    // },
    // 后端代理 绕过host与referer --end
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
