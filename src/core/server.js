let http = require('http');

let { WEBOX_HOST, WEBOX_PORT, WEBOX_ROOT } = require('../helper/config');

let { logger } = require('../helper/utils');

let handleCaller = require('./handle').call;

/////////////////////////////////////////////////////////////
// create server

let httpServer = http.createServer((request, response) => {

    logger(1, 'Request URL:', request.url);

    handleCaller(request, response);

});

httpServer.on('error', err => {

    if (err.code === 'EADDRINUSE') {
        logger(0, 'IP-Port in use:', WEBOX_HOST, WEBOX_PORT);
        logger(0, 'Failover to:', WEBOX_HOST, ++WEBOX_PORT, '\n');
        httpServer.listen(WEBOX_PORT, WEBOX_HOST, 1024);
    }

});

httpServer.on('listening', () => {

    let host = WEBOX_HOST === '0.0.0.0' ? '127.0.0.1' : WEBOX_HOST;
    let port = WEBOX_PORT - 80 === 0 ? '' : ':' + WEBOX_PORT;

    logger(0, 'Server started:', 'http://' + host + port);
    logger(0, 'Root Directory:', WEBOX_ROOT, '\n');

});

/////////////////////////////////////////////////////////////
// start server

module.exports = function () {

    httpServer.listen(WEBOX_PORT, WEBOX_HOST, 1024);

};
