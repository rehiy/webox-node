let path = require('path');
let http = require('http');

let config = require('../helper/config');

let { logger } = require('../helper/utils');

let handleCaller = require('./handle').call;

/////////////////////////////////////////////////////////////
// create server

let httpServer = http.createServer((request, response) => {

    logger(1, request.method, '-', request.url);

    switch (request.method) {
        case 'POST':
            let body = '';
            request.addListener('data', data => {
                body += data
            });
            request.addListener('end', () => {
                try {
                    request.postData = JSON.parse(body);
                } catch (e) {
                    logger(0, 'POST Error: Only JSON data is supported');
                }
                handleCaller(request, response);
            });
            break;
        default:
            handleCaller(request, response);
            break;
    }

});

httpServer.on('error', err => {

    if (err.code === 'EADDRINUSE') {
        logger(0, 'IP-Port in use:', config.WEBOX_HOST, config.WEBOX_PORT);
        logger(0, 'Failover to:', config.WEBOX_HOST, ++config.WEBOX_PORT, '\n');
        httpServer.listen(config.WEBOX_PORT, config.WEBOX_HOST, 1024);
    }

});

httpServer.on('listening', () => {

    let host = config.WEBOX_HOST === '0.0.0.0' ? '127.0.0.1' : config.WEBOX_HOST;
    let port = config.WEBOX_PORT - 80 === 0 ? '' : ':' + config.WEBOX_PORT;

    logger(0, 'Server started:', 'http://' + host + port);
    logger(0, 'Root Directory:', config.WEBOX_ROOT, '\n');

});

/////////////////////////////////////////////////////////////
// start server

module.exports = function (options) {

    options && Object.assign(config, options);

    config.WEBOX_ROOT = path.resolve(config.WEBOX_ROOT);

    httpServer.listen(config.WEBOX_PORT, config.WEBOX_HOST, 1024);

};
