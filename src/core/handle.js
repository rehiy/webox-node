let M_prepare = require('../middleware/prepare');
let M_static = require('../middleware/static');

let M_cgi = require('../middleware/use.cgi');
let M_cjs = require('../middleware/use.cjs');

/////////////////////////////////////////////////////////////

// 中间件堆栈
let handlers = [
    M_cgi, M_cjs
];

/**
 * 将中间件推入堆栈
 * 
 * @param {Function} handler 中间件
 */
function use(handler) {

    handlers.splice(-2, 0, handler);

}

/**
 * 依次调用中间件处理http数据
 * 
 * @param {object} request http.IncomingMessage
 * @param {object} response http.ServerResponse
 */
function call(request, response) {

    M_prepare.handle(request, response);

    let filename = request.filename;
    let pathname = request.objectUrl.pathname;

    for (let { route, handle } of handlers) {

        if (
            (route instanceof RegExp && route.test(pathname)) ||
            (route instanceof Function && route(pathname, filename)) ||
            (typeof route === 'string' && (route === '*' || route === pathname))
        ) {
            if (handle(request, response)) {
                return true;
            }
        }

    }

    M_static.handle(request, response);

}

/////////////////////////////////////////////////////////////

module.exports = {
    use: use,
    call: call
};
