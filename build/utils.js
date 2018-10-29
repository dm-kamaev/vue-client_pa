'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  function assetsSubDirectory() {
    let currentConfig = config.build
    if (process.env.NODE_ENV === 'testing') currentConfig = config.build
    if (process.env.NODE_ENV === 'app') currentConfig = config.app
    if (process.env.NODE_ENV === 'site') currentConfig = config.site
    if (process.env.NODE_ENV === 'site-dev') currentConfig = config.siteDev

    return currentConfig.assetsSubDirectory
  }

  return path.posix.join(assetsSubDirectory(), _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'app' || process.env.NODE_ENV === 'site',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

exports.spinner = function () {
  if (process.env.NODE_ENV === 'testing') return 'building for test...'
  if (process.env.NODE_ENV === 'app') return 'building for app...'
  if (process.env.NODE_ENV === 'site') return 'building for site...'

  return 'building for production...'
}

exports.webpackConfig = function () {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'site-dev') require('./config/webpack.dev.conf')

  return require('./config/webpack.prod.conf')
}

exports.currentConfig = function () {
  if (process.env.NODE_ENV === 'testing') return config.build
  if (process.env.NODE_ENV === 'app') return config.app
  if (process.env.NODE_ENV === 'site') return config.site
  if (process.env.NODE_ENV === 'site-dev') return config.siteDev
  if (process.env.NODE_ENV === 'development') return config.dev

  return config.build
}
