let fs = require('fs');

let getMimeType = require('../helper/mime');

let { httpMessage, logger } = require('../helper/utils');

/////////////////////////////////////////////////////////////

/**
 * 处理静态文件
 * @param {http.IncomingMessage} request HTTP请求
 * @param {http.ServerResponse} response HTTP响应
 */
function handle(request, response) {

    let { filename, requestURL } = request;

    //找不到文件
    if (filename === '') {
        httpMessage(response, requestURL.pathname, 404);
        return true;
    }

    //输出文件头
    response.writeHead(200, {
        'Content-Type': getMimeType(filename)
    });

    logger(1, 'Send Static File:', filename);

    //流式发送文件
    fs.createReadStream(filename)
        .on('error', err => {
            httpMessage(response, requestURL.pathname, 503);
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
