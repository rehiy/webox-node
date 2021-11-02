let { httpMessage } = require('../helper/output');

/////////////////////////////////////////////////////////////

/**
 * 路由检查
 * 
 * @param {string} p pathname
 * @param {string} f filename
 * @returns {boolean} 是否调用处理函数
 */
function route(p, f) {

    return f && /\.cjs(\.js)?$/.test(f);

}

/**
 * 处理HTTP请求
 * 
 * @param {object} request http.IncomingMessage
 * @param {object} response http.ServerResponse
 */
function handle(request, response) {

    let { filename, objectUrl } = request;

    let child = require(filename);

    child(objectUrl, (text, code) => {
        httpMessage(response, text, code);
    });

    return true;

}

/////////////////////////////////////////////////////////////

module.exports = {
    route: route,
    handle: handle
};
