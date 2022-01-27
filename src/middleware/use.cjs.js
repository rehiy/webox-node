let { httpMessage } = require('../helper/utils');

/////////////////////////////////////////////////////////////

/**
 * 路由检查
 * @param {string} p pathname
 * @param {string} f filename
 * @returns 是否调用处理函数
 */
function route(p, f) {
    return f && /\.cjs(\.js)?$/.test(f);
}

/**
 * 处理HTTP请求
 * @param {http.IncomingMessage} request HTTP请求
 * @param {http.ServerResponse} response HTTP响应
 */
function handle(request, response) {

    let { filename, requestURL, postData } = request;

    let child = require(filename);

    child({ requestURL, postData }, (text, code) => {
        httpMessage(response, text, code);
    });

    return true;

}

/////////////////////////////////////////////////////////////

module.exports = {
    route: route,
    handle: handle
};
