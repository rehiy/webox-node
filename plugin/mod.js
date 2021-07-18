let { httpMessage } = require('../helper/utils');

let check = function (r, p) {
    return p && r.match(/\.mod(\.js)?$/);
};

/////////////////////////////////////////////////////////////
// create handler

module.exports = function (pdata, request, response) {

    const { pathname, realpath } = pdata;

    if (!check(pathname, realpath)) {
        return;
    }

    let child = require(realpath);

    child(pdata, function (code, text) {
        httpMessage(response, code, text)
    });

    return true;

};
