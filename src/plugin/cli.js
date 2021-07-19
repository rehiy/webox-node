let exec = require('child_process').exec;

let { httpMessage } = require('../helper/utils');

/////////////////////////////////////////////////////////////

function check(r, p) {
    return p && r.match(/\.cli(\.js)?$/);
}

module.exports = function (pdata, request, response) {

    const { query, pathname, realpath } = pdata;

    if (!check(pathname, realpath)) {
        return;
    }

    let text = '';

    let child = exec(`${process.argv0} ${realpath} ${query}`, {
        windowsHide: true,
        timeout: 60000
    });

    child.stdout.on('data', function (data) {
        text += data;
    });
    child.stderr.on('data', function (data) {
        text += data;
    });

    child.on('exit', function (code) {
        code == 0 ? 200 : 503;
        httpMessage(response, code, text)
    });

    return true;

};
