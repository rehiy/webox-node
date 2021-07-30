let M_prepare = require('../middleware/prepare');
let M_static = require('../middleware/static');

let M_cgi = require('../middleware/use.cgi');
let M_cjs = require('../middleware/use.cjs');

/////////////////////////////////////////////////////////////

let handlers = [
    M_cgi, M_cjs
];

function push(handler) {
    handlers.splice(-2, 0, handler);
}

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
    push: push,
    call: call
};
