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

module.exports = {
    init: require('./core/server')
};
