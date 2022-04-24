let fs = require('fs');

// 加载用户配置

let config = {};

let CF = process.env.WEBOX_CONF_FILE;
if (CF && fs.existsSync(CF)) {
    config = require(CF);
}

// 合并配置参数

module.exports = Object.assign({

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

    WEBOX_CHECK_API: 'aHR0cHM6Ly9hcGkudm1sdS5jb20vd2Vib3gvP3BsYXRmb3JtPW5vZGU='

}, config);
