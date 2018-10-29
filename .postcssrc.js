// https://github.com/michael-ciniawsky/postcss-load-config
const stylelintConf = require('./stylelint.config');

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    "postcss-import": {},
    "stylelint": {
      "rules": stylelintConf
    },
    "postcss-reporter": {
      clearMessages: true
    },
    "postcss-apply": {},
    "postcss-nested": {},
    "postcss-custom-properties": {},
    "postcss-custom-media": {},
    "css-mqpacker": {
      sort: true
    },
    "autoprefixer": {},
    "postcss-csso": {
      restructure: false
    }
  }
}
