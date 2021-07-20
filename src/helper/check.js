let https = require('https');

let { logger } = require('./utils');

let url = 'https://api.vmlu.com/webox/?platform=node';

let req = https.get(url + '&version=dev', res => {
    res.on('data', d => {
        data = JSON.parse(d);
        data.message && logger(data.message);
    });
});

req.on('error', e => {
    logger('Updater Error:', e.message);
});
