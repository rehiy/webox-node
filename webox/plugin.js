let cgi = require('../plugin/cgi');

let tryfile = require('../plugin/tryfile');

/////////////////////////////////////////////////////////////
// parse config

let WEBOX_PLUG = process.env.WEBOX_PLUG || [];

WEBOX_PLUG.unshift(tryfile);
WEBOX_PLUG.push(cgi);

/////////////////////////////////////////////////////////////
// create handler

module.exports = function (pdata, request, response) {

    for (let plug of WEBOX_PLUG) {
        if (plug(pdata, request, response)) {
            return true;
        }
    }

};
