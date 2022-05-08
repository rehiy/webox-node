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

let utils = require('./helper/utils');

let server = require('./core/server');

let { push } = require('./core/handle');

module.exports = {
    helper: utils,
    init: server,
    use: push
};
