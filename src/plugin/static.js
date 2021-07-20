let fs = require('fs');

let getMimeType = require('../helper/mime');

let { httpMessage } = require('../helper/utils');

/////////////////////////////////////////////////////////////

module.exports = function (pdata, request, response) {

    let { url, filepath } = pdata;

    //找不到文件
    if (filepath === '') {
        httpMessage(response, 404, url.pathname);
        return true;
    }

    //流式发送文件
    fs.createReadStream(filepath)
        .on('error', err => {
            httpMessage(response, 503, url.pathname);
        })
        .on('data', chunk => {
            response.writeHead(200, {
                'Content-Type': getMimeType(filepath)
            });
            response.write(chunk);
        })
        .on('end', () => {
            response.end();
        });

    return true;

};
