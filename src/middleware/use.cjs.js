let { httpMessage } = require('../helper/utils');

/////////////////////////////////////////////////////////////

/**
 * 预处理HTTP请求
 * @param {http.IncomingMessage} request HTTP请求
 * @param {http.ServerResponse} response HTTP响应
 */
function handle(request, response) {

    let { filename } = request;

    let child = require(filename);

    child(request, (code, text) => {
        httpMessage(response, code, text)
    });

    return true;

}

/////////////////////////////////////////////////////////////

module.exports = {
    route: /\.cjs(\.js)?$/,
    handle: handle
};
