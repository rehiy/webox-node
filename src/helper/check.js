let https = require('https');

let { WEBOX_MODE } = require('../helper/config');

let { logger } = require('./utils');

let url = 'https://api.vmlu.com/webox/?platform=node';

let req = https.get(url + '&version=dev', res => {

    res.on('data', d => {
        data = JSON.parse(d);
        data.message && logger(data.message);
    });

});

req.on('error', e => {

    if (WEBOX_MODE == 'debug') {
        logger('Updater Error:', e.message);
    }

});
