let fs = require('fs');
let url = require('url');
let exec = require('child_process').exec;

let check = function (reqfile, realpath) {
    return realpath && reqfile.match(/\.dy.js$/);
};

/////////////////////////////////////////////////////////////
// create handler

module.exports = function (pdata, request, response) {

    const { reqfile, realpath } = pdata;

    if (!check(reqfile, realpath)) {
        return;
    }

    let output = '';

    let query = url.parse(request.url).query;

    let child = exec(`${process.argv0} ${realpath} ${query}`, {
        windowsHide: true,
        timeout: 60000
    });

    child.stdout.on('data', function (data) {
        output += data;
    });
    child.stderr.on('data', function (data) {
        output += data;
    });
    child.on('exit', function (code) {
        response.writeHead(code == 0 ? 200 : 503, {
            'Content-Length': output.length,
            'Content-Type': 'text/plain'
        });
        response.write(output);
        response.end();
    });

    return true;

};
