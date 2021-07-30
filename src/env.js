/**
 * Webox - HTTP Server
 * @author rehiy <wang@rehiy.com>
 * @Website http://www.rehiy.com/webox
 */

let { logger } = require('./helper/utils');

/////////////////////////////////////////////////////////////

// set title
process.title = 'Webox - HTTP Server';

// set env var for ORIGINAL cwd
process.env.INIT_CWD = process.cwd();

// normal exit with 0 or 1
process.once('exit', code => {
    logger(0, 'Service Stopped');
    if (code === 0 && process.env.WEBOX_EXIT_CODE) {
        process.exit(1);
    }
});
