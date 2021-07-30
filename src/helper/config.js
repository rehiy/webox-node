let fs = require('fs');
let path = require('path');

// 加载用户配置

let config = {};

let CF = process.env.WEBOX_CONF_FILE;
if (CF && fs.existsSync(CF)) {
    config = require(CF);
}

// 合并配置参数

config = Object.assign({

    // production or development
    WEBOX_MODE: process.env.NODE_ENV || 'development',

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

    WEBOX_CHECK_API: 'https://api.vmlu.com/webox/?platform=node'

}, config);

// 解析脚本目录

config.WEBOX_ROOT = path.resolve(
    config.WEBOX_ROOT
);

// 导出配置
module.exports = config;
