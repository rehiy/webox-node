let { exec } = require('child_process');

let { httpMessage } = require('../helper/utils');

/////////////////////////////////////////////////////////////

/**
 * 路由检查
 * @param {string} p pathname
 * @param {string} f filename
 * @returns 是否调用处理函数
 */
 function route(p, f) {
    return f && /\.cgi(\.js)?$/.test(f);
}

/**
 * 处理HTTP请求
 * @param {http.IncomingMessage} request HTTP请求
 * @param {http.ServerResponse} response HTTP响应
 */
function handle(request, response) {

    let { filename, objectUrl } = request;

    let text = '';

    let args = objectUrl.search.replace(/^\?/, '').replace(/&/g, ' ');

    let child = exec(`${process.argv0} ${filename} ${args}`, {
        windowsHide: true,
        timeout: 60000
    });

    child.stdout.on('data', data => {
        text += data;
    });
    child.stderr.on('data', data => {
        text += data;
    });

    child.on('exit', code => {
        code === 0 ? 200 : 503;
        httpMessage(response, code, text);
    });

    return true;

}

/////////////////////////////////////////////////////////////

module.exports = {
    route: route,
    handle: handle
};

