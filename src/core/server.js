let http = require('http');

let { config, assign } = require('../helper/config');

let { logger } = require('../helper/utils');

let handleCaller = require('./handle').call;

/////////////////////////////////////////////////////////////

/**
 * 创建Http服务器
 * 
 * @param {object} option 用户配置
 */
function listen(option) {

    option && assign(option);

    let serve = http.createServer((request, response) => {

        logger(1, 'Request URL:', request.url);

        handleCaller(request, response);

    });

    serve.on('error', err => {

        if (err.code === 'EADDRINUSE') {
            logger(0, 'IP-Port in use:', config.host, config.port);
            logger(0, 'Failover to:', config.host, ++config.port, '\n');
            serve.listen(config.port, config.host, 1024);
        }

    });

    serve.on('listening', () => {

        let host = config.host === '0.0.0.0' ? '127.0.0.1' : config.host;
        let port = config.port - 80 === 0 ? '' : ':' + config.port;

        logger(0, 'Server started:', 'http://' + host + port);
        logger(0, 'Root Directory:', config.root, '\n');

    });

    serve.listen(config.port, config.host, 1024);

}

/////////////////////////////////////////////////////////////

module.exports = listen;
