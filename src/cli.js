/**
 * Webox - HTTP Server
 *
 * @author rehiy <wang@rehiy.com>
 * @see http://www.rehiy.com/webox
 */

let option = {};

let params = process.argv.slice(2);
let listen = params[0] ? params[0].split(':') : [];

if (listen[0]) {
    option.host = listen[0];
}

if (listen[1] && listen[1] > 0) {
    option.port = listen[1];
}

if (params[1]) {
    option.root = params[1];
}

/////////////////////////////////////////////////////////////

let app = require('./index');

app.init(option);
