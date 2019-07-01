let fs = require('fs');
let path = require('path');

let url = require('url');
let http = require('http');

let echo = require('./echo');
let mime = require('./mime');

/////////////////////////////////////////////////////////////
// create server

let WEBOX_ROOT = path.resolve(process.env.WEBOX_ROOT || 'webroot');

let WEBOX_HOST = process.env.WEBOX_HOST || '127.0.0.1';
let WEBOX_PORT = process.env.WEBOX_PORT || 80;

let WEBOX_INDEX = process.env.WEBOX_INDEX || [
    'index.html', 'index.htm'
];

let httpMessage = function (response, code, text) {
    response.writeHead(code, {
        'Content-Type': 'text/plain'
    });
    response.write(text);
    response.end();
};

let httpTryFile = function (temp) {
    let namePath = url.parse(temp).pathname;
    let realPath = path.join(WEBOX_ROOT, namePath);
    if (fs.lstatSync(realPath).isFile()) {
        return [namePath, realPath];
    }
    //尝试返回默认首页
    for (let index of WEBOX_INDEX) {
        let real = path.join(realPath, index);
        if (fs.existsSync(real)) {
            let name = namePath + '/' + index;
            return [name, real];
        }
    }
    //文件不存在
    return [namePath, ''];
}

let webox = http.createServer(function (request, response) {
    let [namePath, realPath] = httpTryFile(request.url);
    echo('Request URL: ' + request.url);
    //找不到文件
    if (realPath === '') {
        httpMessage(response, 404, 'File Not Found: ' + namePath);
        return false;
    }
    //获取扩展名
    let ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    //发送头信息
    response.writeHead(200, {
        'Content-Type': mime[ext] || 'application/octet-stream'
    });
    //尝试读取文件
    fs.createReadStream(realPath)
        .on('error', function (err) {
            httpMessage(response, 500, 'Server Internal Error: ' + namePath);
        })
        .on('data', function (chunk) {
            response.write(chunk);
        })
        .on('end', function () {
            response.end();
        });
});

webox.on('error', function (err) {
    if (err.code == 'EADDRINUSE') {
        echo('Port is occupied:', WEBOX_HOST, WEBOX_PORT, '\n');
        echo('Try other port:', WEBOX_HOST, ++WEBOX_PORT);
        webox.listen(WEBOX_PORT, WEBOX_HOST, 1024);
    }
});

webox.on('listening', function () {
    let host = WEBOX_HOST === '0.0.0.0' ? '127.0.0.1' : WEBOX_HOST;
    let port = WEBOX_PORT === '80' ? '' : ':' + WEBOX_PORT;
    echo('Service started:', 'http://' + host + port);
    echo('Website Root Directory:', WEBOX_ROOT);
});

/////////////////////////////////////////////////////////////
// start server

webox.listen(WEBOX_PORT, WEBOX_HOST, 1024);
