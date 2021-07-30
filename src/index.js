/**
 * Webox - HTTP Server
 * @author rehiy <wang@rehiy.com>
 * @Website http://www.rehiy.com/webox
 */

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

/////////////////////////////////////////////////////////////

let app = require('./app');

app.init();
