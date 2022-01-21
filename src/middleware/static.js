let fs = require('fs');

let getMimeType = require('../helper/mime');

let { httpMessage } = require('../helper/utils');

/////////////////////////////////////////////////////////////

/**
 * 处理静态文件
 * @param {http.IncomingMessage} request HTTP请求
 * @param {http.ServerResponse} response HTTP响应
 */
function handle(request, response) {

    let { filename, objectUrl } = request;

    //找不到文件
    if (filename === '') {
        httpMessage(response, objectUrl.pathname, 404);
        return true;
    }

    //输出文件头
    response.writeHead(200, {
        'Content-Type': getMimeType(filename)
    });

    //流式发送文件
    fs.createReadStream(filename)
        .on('error', err => {
            httpMessage(response, objectUrl.pathname, 503);
        })
        .on('data', chunk => {
            response.write(chunk);
        })
        .on('end', () => {
            response.end();
        });

    return true;

};

/////////////////////////////////////////////////////////////

module.exports = {
    route: '*',
    handle: handle
};
