let cgi = require('../plugin/cgi');

let tryfile = require('../plugin/tryfile');

let { WEBOX_PLUG } = require('../helper/config');

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
