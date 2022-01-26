/**
 * Webox - HTTP Server
 * @author rehiy <wang@rehiy.com>
 * @Website http://www.rehiy.com/webox
 */

'use strict';

// load env
require('./env');

// security check
require('./helper/check');

/////////////////////////////////////////////////////////////

let use = require('./core/handle').push;

let server = require('./core/server');

module.exports = {
    init: server,
    use: use
};
