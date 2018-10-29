'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const backendUrl = require('./backend').url

module.exports  = {
  build: {
    env: require('./env/prod.env'),
    entry: {
      app: ['whatwg-fetch', 'babel-polyfill', './src/main.js']
    },
    template: 'index.html',
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    hash: true,
    assetsSubDirectory: 'vue',
    assetsPublicPath: '/static/general/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  app: {
    env: require('./env/app.env'),
    template: 'app.html',
    index: path.resolve(__dirname, '../dist/app.html'),
    entry: {
      app: ['whatwg-fetch', 'babel-polyfill', './src/main.js']
    },
    hash: true,
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  site: {
    env: require('./env/site.env'),
    template: 'src/site/index.html',
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    entry: {
      app: ['whatwg-fetch', 'babel-polyfill', './src/site/index.js']
    },
    hash: false,
    assetsSubDirectory: 'vue',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  siteDev: {
    env: require('./env/site-dev.env'),
    entry: {
      app: ['whatwg-fetch', 'babel-polyfill', './src/site/index.js']
    },
    template: 'src/site/index.html',
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    port: process.env.PORT || 8080,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/proxy_request': {
        target: backendUrl,
        secure: false,
        changeOrigin: true,
        cookieDomainRewrite: 'localhost',
        headers: {
          origin: backendUrl
        }
      },
      '/static': {
        target: backendUrl,
        secure: false,
        changeOrigin: true
      },
      '/payments/take/': {
        target: backendUrl,
        secure: false,
        changeOrigin: true
      },
      '/aj': {
        target: backendUrl,
        secure: false,
        changeOrigin: true
      },
      '/ticket-handler': {
        target: backendUrl,
        secure: false,
        changeOrigin: true
      },
      '/staff': {
        target: backendUrl,
        secure: false,
        changeOrigin: true
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },
  dev: {
    env: require('./env/dev.env'),
    entry: {
      app: ['whatwg-fetch', 'babel-polyfill', './src/main.js']
    },
    template: 'index.html',
    index: path.resolve(__dirname, '../dist/index.html'),
    port: process.env.PORT || 8080,
    assetsRoot: path.resolve(__dirname, '../dist'),
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/proxy_request': {
        target: backendUrl,
        secure: false,
        changeOrigin: true,
        cookieDomainRewrite: 'localhost',
        headers: {
          origin: backendUrl
        }
      },
      '/static': {
        target: backendUrl,
        secure: false,
        changeOrigin: true
      },
      '/payments/take/': {
        target: backendUrl,
        secure: false,
        changeOrigin: true
      },
      '/aj': {
        target: backendUrl,
        secure: false,
        changeOrigin: true
      },
      '/ticket-handler': {
        target: backendUrl,
        secure: false,
        changeOrigin: true
      },
      '/staff': {
        target: backendUrl,
        secure: false,
        changeOrigin: true
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },
}


