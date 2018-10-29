const fs = require('fs');

module.exports = {
  getSftpConfig: {
    username: 'lobovaa',
    host: '192.168.1.111',
    port: '22',
    privateKey: fs.readFileSync('/Users/Lobova.A/.ssh/id_rsa')
  },
  url: 'https://www-dev2.domovenok.su',
  appPath: '../cordova'
}
