let { httpMessage } = require('../helper/utils');

/////////////////////////////////////////////////////////////

function check(r, p) {
    return p && r.match(/\.mod(\.js)?$/);
}

module.exports = function (pdata, request, response) {

    let { url, realpath } = pdata;

    if (!check(url.pathname, realpath)) {
        return;
    }

    let child = require(realpath);

    child(pdata, function (code, text) {
        httpMessage(response, code, text)
    });

    return true;

};
