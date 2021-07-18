let url = require('url');
let exec = require('child_process').exec;

let check = function (r, p) {
    return p && r.match(/\.cgi(\.js)?$/);
};

/////////////////////////////////////////////////////////////
// create handler

module.exports = function (pdata, request, response) {

    const { reqfile, realpath } = pdata;

    if (!check(reqfile, realpath)) {
        return;
    }

    let conts = '';

    let query = url.parse(request.url).query;

    let child = exec(`${process.argv0} ${realpath} ${query}`, {
        windowsHide: true,
        timeout: 60000
    });

    child.stdout.on('data', function (data) {
        conts += data;
    });
    child.stderr.on('data', function (data) {
        conts += data;
    });
    child.on('exit', function (code) {
        response.writeHead(code == 0 ? 200 : 503, {
            'Content-Length': conts.length,
            'Content-Type': 'text/plain'
        });
        response.write(conts);
        response.end();
    });

    return true;

};
