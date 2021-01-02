'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')  //webpack拷贝依赖  //https://www.webpackjs.com/plugins/copy-webpack-plugin/
const HtmlWebpackPlugin = require('html-webpack-plugin')  //https://www.webpackjs.com/plugins/html-webpack-plugin/
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')  //webpack错误提示依赖
const portfinder = require('portfinder')  //获取端口的依赖
const chalk= require('chalk')  //改变控制台字及背景颜色的依赖
const os=require("os")  //用于获取本机在区域网的ip

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development  //cheap-module-eval-source-map的发展速度更快
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js  //这些devServer选项应该在/config/index.js中定制
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.  /因为我们使用CopyWebpackPlugin。
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin  /FriendlyErrorsPlugin所需
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.  //HMR更新时在控制台中显示正确的文件名。
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests  //发布e2e测试所需的新端口
      process.env.PORT = port
      // add port to devServer config  //添加端口到devServer配置
      devWebpackConfig.devServer.port = port
      // 获取本机区域网的ip
      let localIp, 
        prompt = ''
      try {
        localIp=os.networkInterfaces()['以太网'][1].address
      } catch (error) {
        console.log('未插入以太网', error)
        localIp = '*.*.*.*'
        prompt = '(请检查以太网是否正常插入)'
      }

      // 打印的消息
      let messages
      if(devWebpackConfig.devServer.host == '0.0.0.0'){
        messages = `程序正在运行...\n`+
                    `    - 本地访问： ${chalk.cyan(`http://localhost:${port}`)}\n`+
                    `    - 局域网访问： ${chalk.cyan(`http://${localIp}:${port}`)}${prompt}\n`
      }else{
        messages = `程序正在运行：${chalk.cyan(`http://${devWebpackConfig.devServer.host}:${port}`)}\n`
      }
      // Add FriendlyErrorsPlugin  //添加FriendlyErrorsPlugin（webpack错误提示插件）
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [
            messages,
            `构建生产环境包，请运行 ${chalk.cyan('npm run build')}
            -  +  +  +
            - ┏┓　 ┏┓+ +
            - ┏┛┻━━━┛┻┓ + +
            - ┃　　　　　　┃
            - ┃　　　━　　 ┃ ++ + + +
            - ████━████  ┃+
            - ┃　　　　　　　┃ +
            - ┃　　　┻　　　┃
            - ┃　　　　　　┃ + +
            - ┗━┓　　　┏━┛
            -   ┃　　　┃
            -   ┃　　　┃ + + + +
            -   ┃　　　┃
            -   ┃　　　┃ +
            -   ┃　　　┃
            -   ┃　　　┃　　+
            -   ┃　 　 ┗━━━┓ + +
            -   ┃ 　　　　   ┣┓
            -   ┃ 　　　　　 ┏┛
            -   ┗┓┓┏━┳┓┏┛ + + + +
            -   ┃┫┫ ┃┫┫
            -   ┗┻┛ ┗┻┛+ + + +`
          ],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))
      resolve(devWebpackConfig)
    }
  })
})

