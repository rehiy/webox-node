let PR = {};

let fs = require('fs');

let cf = process.env.WEBOX_CONF_FILE;
if (cf && fs.existsSync(cf)) {
    PR = require(cf);
}

module.exports = Object.assign({

    WEBOX_HOST: '127.0.0.1',

    WEBOX_PORT: 80,

    WEBOX_ROOT: 'webroot',

    WEBOX_PLUG: [],

    WEBOX_INDEX: [
        'index.html',
        'index.htm',
        'index.cgi'
    ],

    WEBOX_ERROR: {
        200: '%s',
        404: 'File Not Found: %s',
        503: 'Server Internal Error: %s'
    }

}, PR);
