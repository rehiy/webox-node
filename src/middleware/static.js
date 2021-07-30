let fs = require('fs');

let getMimeType = require('../helper/mime');

let { httpMessage } = require('../helper/utils');

/////////////////////////////////////////////////////////////

/**
 * 预处理HTTP请求
 * @param {http.IncomingMessage} request HTTP请求
 * @param {http.ServerResponse} response HTTP响应
 */
function handle(request, response) {

    let { filename, objectUrl } = request;

    //找不到文件
    if (filename === '') {
        httpMessage(response, 404, objectUrl.pathname);
        return true;
    }

    //流式发送文件
    fs.createReadStream(filename)
        .on('error', err => {
            httpMessage(response, 503, objectUrl.pathname);
        })
        .on('data', chunk => {
            response.writeHead(200, {
                'Content-Type': getMimeType(filename)
            });
            response.write(chunk);
        })
        .on('end', () => {
            response.end();
        });

    return true;

};

/////////////////////////////////////////////////////////////

module.exports = {
    route: /.*/,
    handle: handle
};
