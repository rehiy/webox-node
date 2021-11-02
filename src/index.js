/**
 * Webox - HTTP Server
 * 
 * @author rehiy <wang@rehiy.com>
 * @see http://www.rehiy.com/webox
 */

'use strict';

// load env
require('./env');

// check update
require('./helper/update');

/////////////////////////////////////////////////////////////

let use = require('./core/handle').use;

let server = require('./core/server');

module.exports = {
    init: server,
    use: use
};
