let clijs = require('../plugin/cli');
let modjs = require('../plugin/mod');

let prepare = require('../plugin/prepare');

let { WEBOX_PLUG } = require('../helper/config');

/////////////////////////////////////////////////////////////

module.exports = function (pdata, request, response) {

    prepare(pdata, request, response);

    for (let plug of WEBOX_PLUG) {
        if (plug(pdata, request, response)) {
            return true;
        }
    }

    if (clijs(pdata, request, response)) {
        return true;
    }

    if (modjs(pdata, request, response)) {
        return true;
    }

};
