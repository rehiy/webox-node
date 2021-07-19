let exec = require('child_process').exec;

let { httpMessage } = require('../helper/utils');

/////////////////////////////////////////////////////////////

function check(r, p) {
    return p && r.match(/\.cli(\.js)?$/);
}

module.exports = function (pdata, request, response) {

    let { url, realpath } = pdata;

    if (!check(url.pathname, realpath)) {
        return;
    }

    let text = '';

    let args = url.search.replace(/^\?/, '').replace(/&/g, ' ');

    let child = exec(`${process.argv0} ${realpath} ${args}`, {
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
