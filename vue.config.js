const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

const CompressionPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css', 'html', 'json', 'svg']

module.exports = defineConfig({
  // 需要编译的依赖设置
  transpileDependencies: ['element-ui', 'vue-contextmenujs', 'axios', 'mockjs', 'echarts'],
  // webpack 配置
  configureWebpack: (config) => {
    // 开发环境时生效
    if (process.env.NODE_ENV === 'production') {
      config.performance = {
        // 警告 webpack 的性能提示
        hints: 'warning',
        // 入口起点的最大体积
        maxEntrypointSize: 50000000,
        // 生成文件的最大体积
        maxAssetSize: 30000000,
        // 只给出 js 文件的性能提示
        assetFilter: function (assetFilename) {
          return assetFilename.endsWith('.js')
        },
      }
    }
    return {
      resolve: {
        alias: {
          '@': path.resolve('src'),
          '@hooks': path.resolve('src/utils/hooks'),
        },
        extensions: ['.js', '.vue', '.json'],
      },
      entry: {
        app: ['core-js'],
      },

      module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            include: [
              resolve('/node_modules/webpack-dev-server/client'),
              resolve('/node_modules/element-ui/src'),
              resolve('/node_modules/element-ui/packages'),
            ],
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            type: 'asset/resource',
            use: [
              {
                loader: 'image-webpack-loader',
                options: {
                  disable: process.env.NODE_ENV === 'development',
                  // // 压缩 png
                  // optpng: {
                  //   optimizationLevel: 2,
                  // },
                  // 将 jpg/png 图片转变为 webp
                  webp: {
                    quality: 75,
                  },
                },
              },
            ],
          },
        ],
      },
      // devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
      devtool: 'source-map',
      externals: {
        webGL: 'createUnityInstance',
      },
    }
  },
  // 提供了一个 webpack 原始配置的上层抽象
  chainWebpack: (config) => {
    config.entry.app = ['core-js', './src/main.js']
    if (process.env.NODE_ENV === 'production') {
      // 配置 gzip
      config.plugin('gzip').use(
        new CompressionPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
        })
      )
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: [`@import "src/assets/style/index.scss";`].join(''),
      },
    },
  },
  // 代理
  devServer: {
    port: 7777,
    host: '127.0.0.1',
    open: false, //启动服务时自动打开浏览器
    https: false, //开启https
    historyApiFallback: true,
    proxy: {
      '/api162': {
        target: 'http://192.168.171.42',
        // target: 'http://127.0.0.1',
        ws: true, //开启websocket
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api162': '/',
        }, //重写，将/api替换为/
      },
      '/api42': {
        target: 'http://192.168.192.19:85',
        // target: 'http://127.0.0.1',
        ws: true, //开启websocket
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api42': '/',
        },
      },
      '/api43': {
        target: 'http://192.168.192.19:85',
        // target: 'http://127.0.0.1',
        ws: true, //开启websocket
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api43': '/',
        },
      },
      '/webGL': {
        target: 'http://127.0.0.1',
        ws: true, //开启websocket
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/webGL': '/dalirobotcms/js/webGL/Build/',
        },
      },
      '/robot': {
        target: 'http://192.168.124.22',
        ws: true, //开启websocket
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/robot': '/dalirobotcms/ajax/',
        },
      },
      '/inspect': {
        target: 'http://192.168.192.19:85',
        ws: true, //开启websocket
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/inspect': '/dalirobotcms/',
        },
      },
      '/deviceInfo': {
        target: 'http://192.168.124.39',
        ws: true, //开启websocket
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/deviceInfo': '/dalirobotcms/ajax/',
        },
      },
    },
  },
})
