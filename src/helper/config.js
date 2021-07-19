let PR = {};

let fs = require('fs');
let path = require('path');

// 加载用户配置

let cf = process.env.WEBOX_CONF_FILE;
if (cf && fs.existsSync(cf)) {
    PR = require(cf);
}

// 导出配置参数

module.exports = Object.assign({

    WEBOX_HOST: '127.0.0.1',

    WEBOX_PORT: 80,

    WEBOX_ROOT: 'webroot',

    WEBOX_PLUG: [],

    WEBOX_INDEX: [
        'index.html',
        'index.htm'
    ],

    WEBOX_ERROR: {
        200: '%s',
        404: 'File Not Found: %s',
        503: 'Server Internal Error: %s'
    }

}, PR);

// 修正绝对路径

module.exports.WEBOX_ROOT = path.resolve(
    module.exports.WEBOX_ROOT
);
