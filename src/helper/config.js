let RC = {};

let fs = require('fs');
let path = require('path');

// 加载用户配置

let cf = process.env.WEBOX_CONF_FILE;

if (cf && fs.existsSync(cf)) {
    RC = require(cf);
}

// 导出配置参数

module.exports = Object.assign({

    WEBOX_MODE: process.env.NODE_ENV || 'development', // production or development

    WEBOX_HOST: '127.0.0.1',

    WEBOX_PORT: 80,

    WEBOX_ROOT: 'webroot',

    WEBOX_INDEX: [
        'index.html',
        'index.htm'
    ],

    WEBOX_ERROR: {
        200: '%s',
        400: 'Bad Request: %s',
        403: 'Forbidden : %s',
        404: 'NO Found: %s',
        500: 'Internal Server Error: %s',
        503: 'Service Unavilable: %s'
    },

    WEBOX_PLUGIN: [],

    WEBOX_CHECK_API: 'https://api.vmlu.com/webox/?platform=node'

}, RC);

// 修正绝对路径

module.exports.WEBOX_ROOT = path.resolve(
    module.exports.WEBOX_ROOT
);
