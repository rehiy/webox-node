let P_cli = require('../plugin/cli');
let P_mod = require('../plugin/mod');

let P_prepare = require('../plugin/prepare');
let P_static = require('../plugin/static');

let { WEBOX_PLUG } = require('../helper/config');

/////////////////////////////////////////////////////////////

module.exports = function (pdata, request, response) {

    P_prepare(pdata, request, response);

    for (let plug of WEBOX_PLUG) {
        if (plug(pdata, request, response)) {
            return true;
        }
    }

    if (P_cli(pdata, request, response)) {
        return true;
    }

    if (P_mod(pdata, request, response)) {
        return true;
    }

    if (P_static(pdata, request, response)) {
        return true;
    }

    return false;

};
