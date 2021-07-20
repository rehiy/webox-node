let { httpMessage } = require('../helper/utils');

/////////////////////////////////////////////////////////////

function check(p) {
    return p && p.match(/\.mod(\.js)?$/);
}

module.exports = function (pdata, request, response) {

    let { filepath } = pdata;

    if (!check(filepath)) {
        return;
    }

    let child = require(filepath);

    child(pdata, (code, text) => {
        httpMessage(response, code, text)
    });

    return true;

};
