let https = require('https');

let { WEBOX_CHECK_API } = require('./config');

let { logger, parseJSON } = require('./utils');

let req = https.get(WEBOX_CHECK_API + '&version=dev', res => {

    if (res.statusCode != 200) {
        return;
    }

    let raw = '';

    res.on('data', d => {
        raw += d.toString();
    });

    res.on('end', () => {
        let data = parseJSON(raw);
        if (data && data.message) {
            logger(data.message);
        }
    });

});

req.on('error', e => {

    logger(1, 'Checker Error:', e.message);

});
