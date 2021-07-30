let { WEBOX_PLUGIN } = require('../helper/config');

let P_prepare = require('../middleware/prepare');
let P_static = require('../middleware/static');

let P_cgi = require('../middleware/use.cgi');
let P_cjs = require('../middleware/use.cjs');

/////////////////////////////////////////////////////////////

WEBOX_PLUGIN.push(P_cgi, P_cjs);

function caller(request, response) {

    P_prepare.handle(request, response);

    let pathname = request.objectUrl.pathname;

    for (let plug of WEBOX_PLUGIN) {

        let { route, handle } = plug;

        if (route instanceof RegExp) {
            if (route.test(pathname) === false) {
                continue;
            }
        }

        if (typeof route === 'function') {
            if (route(pathname) !== true) {
                continue;
            }
        }

        if (typeof route === 'string') {
            if (route !== pathname) {
                continue;
            }
        }

        if (handle(request, response)) {
            return true;
        }

    }

    P_static.handle(request, response);

}

/////////////////////////////////////////////////////////////

module.exports = {
    handleCaller: caller
};
