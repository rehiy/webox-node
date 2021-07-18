#!/usr/bin/env node

'use strict';

// set title
process.title = 'Webox - HTTP Server';

// set env var for ORIGINAL cwd
process.env.INIT_CWD = process.cwd();

// exit with 0 or 1
process.once('exit', function (code) {
    logger('Service Stopped');
    if (code === 0 && process.env.WEBOX_FAILED) {
        process.exit(1);
    }
});

/////////////////////////////////////////////////////////////
// code from www.rehiy.com

var config = process.argv.slice(2);
var listen = config[0] ? config[0].split(':') : [];

if (typeof process.env.WEBOX_HOST === 'undefined') {
    process.env.WEBOX_HOST = listen[0] || '127.0.0.1';
}

if (typeof process.env.WEBOX_PORT === 'undefined') {
    process.env.WEBOX_PORT = listen[1] > 0 ? listen[1] : 80;
}

if (typeof process.env.WEBOX_ROOT === 'undefined') {
    process.env.WEBOX_ROOT = config[1] || 'webroot';
}

require('./webox/core');
