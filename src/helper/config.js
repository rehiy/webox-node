let path = require('path');

// 默认配置
let config = {

    // production or development
    mode: process.env.NODE_ENV || 'development',

    host: '127.0.0.1',

    port: 80,

    root: 'webroot',

    index: [
        'index.html',
        'index.htm'
    ],

    error: {
        200: '%s',
        400: 'Bad Request: %s',
        403: 'Forbidden : %s',
        404: 'NO Found: %s',
        500: 'Internal Server Error: %s',
        503: 'Service Unavilable: %s'
    },

    updateUrl: 'https://api.vmlu.com/webox/?platform=node'

};

// 获取绝对路径
config.root = path.resolve(config.root);

/////////////////////////////////////////////////////////////

// 导出配置工具
module.exports = {
    config: config,
    assign: function (obj) {
        if (obj.root) {
            obj.root = path.resolve(obj.root);
        }
        Object.assign(config, obj);
    }
};
