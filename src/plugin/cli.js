let exec = require('child_process').exec;

let { httpMessage } = require('../helper/utils');

/////////////////////////////////////////////////////////////

function check(p) {
    return p && p.match(/\.cli(\.js)?$/);
}

module.exports = function (pdata, request, response) {

    let { url, filepath } = pdata;

    if (!check(filepath)) {
        return;
    }

    let text = '';

    let args = url.search.replace(/^\?/, '').replace(/&/g, ' ');

    let child = exec(`${process.argv0} ${filepath} ${args}`, {
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
