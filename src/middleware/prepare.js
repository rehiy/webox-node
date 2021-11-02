let fs = require('fs');
let path = require('path');

let { config } = require('../helper/config');

/////////////////////////////////////////////////////////////

/**
 * 补全文件路径
 * 
 * @param {string} file 路径
 * @param {string} suff 后缀
 */
function fixpath(file, suff) {

    if (suff.indexOf('.') === 0) {
        return file + suff;
    }

    return path.join(file, suff);

}

/**
 * 解析HTTP请求
 * 
 * @param {object} request http.IncomingMessage
 */
function handle(request) {

    let objectUrl = new URL(request.url, `http://${request.headers.host}`);

    let filename = path.join(config.root, objectUrl.pathname);

    //添加基础属性
    request.filename = '';
    request.objectUrl = objectUrl;

    //文件存在直接返回
    let filestat = fs.existsSync(filename) && fs.lstatSync(filename);
    if (filestat && filestat.isFile()) {
        request.filename = filename;
        return;
    }

    //尝试返回默认首页
    for (let index of config.index) {
        let file = fixpath(filename, index);
        if (fs.existsSync(file)) {
            request.filename = file;
            return;
        }
    }

}

/////////////////////////////////////////////////////////////

module.exports = {
    route: '*',
    handle: handle
};
