let cgi = require('../plugin/cgi');

let tryfile = require('../plugin/tryfile');

/////////////////////////////////////////////////////////////
// parse config

let WEBOX_PLUG = process.env.WEBOX_PLUG || [];

/////////////////////////////////////////////////////////////
// create handler

module.exports = function (pdata, request, response) {

    tryfile(pdata, request, response);

    for (let plug of WEBOX_PLUG) {
        if (plug(pdata, request, response)) {
            return true;
        }
    }

    if (cgi(pdata, request, response)) {
        return true;
    }

};
