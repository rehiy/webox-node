let http = require('http');

let { logger } = require('../helper/utils');

let { WEBOX_HOST, WEBOX_PORT, WEBOX_ROOT } = require('../helper/config');

let pluginCaller = require('./plugin');

/////////////////////////////////////////////////////////////
// create server

let httpServer = http.createServer(function (request, response) {

    logger('Request URL:', request.url);

    let pdata = {
        url: new URL(request.url, `http://${request.headers.host}`),
        realpath: ''
    };

    pluginCaller(pdata, request, response);

});

httpServer.on('error', function (err) {

    if (err.code == 'EADDRINUSE') {
        logger('IP-Port in use:', WEBOX_HOST, WEBOX_PORT);
        logger('Failover:', WEBOX_HOST, ++WEBOX_PORT, '\n');
        httpServer.listen(WEBOX_PORT, WEBOX_HOST, 1024);
    }

});

httpServer.on('listening', function () {

    let host = WEBOX_HOST === '0.0.0.0' ? '127.0.0.1' : WEBOX_HOST;
    let port = WEBOX_PORT === '80' ? '' : ':' + WEBOX_PORT;

    logger('Server started:', 'http://' + host + port);
    logger('Root Directory:', WEBOX_ROOT, '\n');

});

/////////////////////////////////////////////////////////////
// start server

httpServer.listen(WEBOX_PORT, WEBOX_HOST, 1024);
