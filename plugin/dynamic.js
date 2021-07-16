let exec = require('child_process').exec;

let url = require('url');

let matcher = function (uri) {
    let uripath = url.parse(uri).pathname;
    return uripath.match(/\.dy.js$/);
};

let handler = function (response, dyjs, args) {
    let rs = '';
    let pf = exec(`${process.argv0} ${dyjs} ${args}`, {
        windowsHide: true,
        timeout: 60000
    });
    pf.stdout.on('data', function (data) {
        rs += data;
    });
    pf.stderr.on('data', function (data) {
        rs += data;
    });
    pf.on('exit', function (code) {
        response.writeHead(code == 0 ? 200 : 503, {
            'Content-Length': rs.length,
            'Content-Type': 'text/plain'
        });
        response.write(rs);
        response.end();
    });
};

module.exports = {
    matcher: matcher,
    handler: handler
};
