let fs = require('fs');

let getMimeType = require('../helper/mime');

let { httpMessage } = require('../helper/utils');

/////////////////////////////////////////////////////////////

module.exports = function (pdata, request, response) {

    let { url, realpath } = pdata;

    //找不到文件
    if (realpath === '') {
        httpMessage(response, 404, url.pathname);
        return true;
    }

    //流式发送文件
    fs.createReadStream(realpath)
        .on('error', function (err) {
            httpMessage(response, 503, url.pathname);
        })
        .on('data', function (chunk) {
            response.writeHead(200, {
                'Content-Type': getMimeType(realpath)
            });
            response.write(chunk);
        })
        .on('end', function () {
            response.end();
        });

    return true;

};
