let fs = require('fs');

let getMimeType = require('../helper/mime');

let { httpMessage } = require('../helper/output');

/////////////////////////////////////////////////////////////

/**
 * 处理静态文件
 * 
 * @param {object} request http.IncomingMessage
 * @param {object} response http.ServerResponse
 */
function handle(request, response) {

    let { filename, objectUrl } = request;

    //找不到文件
    if (filename === '') {
        httpMessage(response, objectUrl.pathname, 404);
        return true;
    }

    //流式发送文件
    let stream = fs.createReadStream(filename);

    stream.on('error', () => {
        httpMessage(response, objectUrl.pathname, 503);
    });

    stream.on('data', chunk => {
        response.writeHead(200, {
            'Content-Type': getMimeType(filename)
        });
        response.write(chunk);
    });

    stream.on('end', () => {
        response.end();
    });

    return true;

}

/////////////////////////////////////////////////////////////

module.exports = {
    route: '*',
    handle: handle
};
