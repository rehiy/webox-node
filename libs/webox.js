let fs = require('fs');
let path = require('path');
let exec = require('child_process').exec;

let url = require('url');
let http = require('http');

let echo = require('./echo');
let mime = require('./mime');

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
    500: 'Server Internal Error: %s'
};

/////////////////////////////////////////////////////////////
// create server

let httpMessage = function (response, code, text) {
    text = WEBOX_ERROR[code].replace('%s', text);
    response.writeHead(code, {
        'Content-Type': 'text/plain; charset=utf-8'
    });
    response.write(text);
    response.end();
};

let HttpModjs = function (response, mjs) {
    let pf = exec(`${process.argv0} ${mjs}`);
    pf.stdout.on('data', function (data) {
        httpMessage(response, 200, data);
    });
    pf.stderr.on('data', function (data) {
        httpMessage(response, 500, data);
    });
};

let httpTryFile = function (temp) {
    let filePath = url.parse(temp).pathname;
    let realPath = path.join(WEBOX_ROOT, filePath);
    let pathStat = fs.existsSync(realPath) && fs.lstatSync(realPath);
    //文件存在直接返回
    if (pathStat && pathStat.isFile()) {
        return [filePath, realPath];
    }
    //尝试返回默认首页
    if (pathStat && pathStat.isDirectory()) {
        for (let index of WEBOX_INDEX) {
            let real = path.join(realPath, index);
            if (fs.existsSync(real)) {
                return [filePath + '/' + index, real];
            }
        }
    }
    //文件不存在
    return [filePath, ''];
};

let httpServer = http.createServer(function (request, response) {
    let [filePath, realPath] = httpTryFile(request.url);
    echo('Request URL:', request.url);
    //找不到文件
    if (realPath === '') {
        httpMessage(response, 404, filePath);
        return 404;
    }
    //运行js模块
    if (filePath.match(/\.mjs$/)) {
        HttpModjs(response, realPath);
        return 200;
    }
    //尝试读取文件
    fs.createReadStream(realPath)
        .on('error', function (err) {
            httpMessage(response, 500, filePath);
        })
        .on('data', function (chunk) {
            response.writeHead(200, {
                'Content-Type': mime(realPath)
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
