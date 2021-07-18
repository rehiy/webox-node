let fs = require('fs');
let path = require('path');

let url = require('url');
let http = require('http');

let echo = require('./echo');
let mime = require('./mime');

let dyjs = require('../plugin/dynamic');

/////////////////////////////////////////////////////////////
// build config

let WEBOX_ROOT = path.resolve(process.env.WEBOX_ROOT || 'webroot');

let WEBOX_HOST = process.env.WEBOX_HOST || '127.0.0.1';
let WEBOX_PORT = process.env.WEBOX_PORT || 80;

let WEBOX_INDEX = process.env.WEBOX_INDEX || [
    'index.html', 'index.htm'
];

let WEBOX_ERROR = process.env.WEBOX_INDEX || {
    200: '%s',
    404: 'File Not Found: %s',
    503: 'Server Internal Error: %s'
};

/////////////////////////////////////////////////////////////
// create server

let httpMessage = function (response, code, text) {
    text = WEBOX_ERROR[code].replace('%s', text);
    response.writeHead(code, {
        'Content-Type': 'text/plain'
    });
    response.write(text);
    response.end();
};

let httpTryFile = function (uri) {
    let uripath = url.parse(uri).pathname;
    let fullpath = path.join(WEBOX_ROOT, uripath);
    let pathstat = fs.existsSync(fullpath) && fs.lstatSync(fullpath);
    //文件存在直接返回
    if (pathstat && pathstat.isFile()) {
        return [uripath, fullpath];
    }
    //尝试返回默认首页
    if (pathstat && pathstat.isDirectory()) {
        for (let index of WEBOX_INDEX) {
            let real = path.join(fullpath, index);
            if (fs.existsSync(real)) {
                return [uripath + '/' + index, real];
            }
        }
    }
    //文件不存在
    return [uripath, ''];
};

let httpServer = http.createServer(function (request, response) {
    let [uripath, fullpath] = httpTryFile(request.url);
    echo('Request URL:', request.url);
    //找不到文件
    if (fullpath === '') {
        return httpMessage(response, 404, uripath);
    }
    //运行dyjs模块
    if (dyjs.matcher(request.url)) {
        let query = url.parse(request.url).query;
        return dyjs.handler(response, fullpath, query);
    }
    //尝试读取文件
    fs.createReadStream(fullpath)
        .on('error', function (err) {
            httpMessage(response, 503, uripath);
        })
        .on('data', function (chunk) {
            response.writeHead(200, {
                'Content-Type': mime(fullpath)
            });
            response.write(chunk);
        })
        .on('end', function () {
            response.end();
        });
});

httpServer.on('error', function (err) {
    if (err.code == 'EADDRINUSE') {
        echo('IP-Port in use:', WEBOX_HOST, WEBOX_PORT);
        echo('Failover:', WEBOX_HOST, ++WEBOX_PORT, '\n');
        httpServer.listen(WEBOX_PORT, WEBOX_HOST, 1024);
    }
});

httpServer.on('listening', function () {
    let host = WEBOX_HOST === '0.0.0.0' ? '127.0.0.1' : WEBOX_HOST;
    let port = WEBOX_PORT === '80' ? '' : ':' + WEBOX_PORT;
    echo('Server started:', 'http://' + host + port);
    echo('Root Directory:', WEBOX_ROOT, '\n');
});

/////////////////////////////////////////////////////////////
// start server

httpServer.listen(WEBOX_PORT, WEBOX_HOST, 1024);
