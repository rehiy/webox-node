/**
 * Webox - HTTP Server
 * @author rehiy <wang@rehiy.com>
 * @Website http://www.rehiy.com
 */

'use strict';

// set title
process.title = 'Webox - HTTP Server';

// set env var for ORIGINAL cwd
process.env.INIT_CWD = process.cwd();

// normal exit with 0 or 1
process.once('exit', code => {
    logger('Service Stopped');
    if (code === 0 && process.env.WEBOX_EXIT_CODE) {
        process.exit(1);
    }
});

/////////////////////////////////////////////////////////////
// code from www.rehiy.com

let config = require('./helper/config');

let params = process.argv.slice(2);
let listen = params[0] ? params[0].split(':') : [];

if (listen[0]) {
    config.WEBOX_HOST = listen[0];
}

if (listen[1] && listen[1] > 0) {
    config.WEBOX_PORT = listen[1];
}

if (params[1]) {
    config.WEBOX_ROOT = params[1];
}

require('./helper/check');
require('./webox/core');
