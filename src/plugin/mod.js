let { httpMessage } = require('../helper/utils');

/////////////////////////////////////////////////////////////

function check(r, p) {
    return p && r.match(/\.mod(\.js)?$/);
}

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
