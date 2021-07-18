let fs = require('fs');
let url = require('url');
let path = require('path');

let { WEBOX_ROOT, WEBOX_INDEX } = require('../helper/config');

/////////////////////////////////////////////////////////////
// create handler

function fixpath(file, extra) {
    if (extra.indexOf('.') === 0) {
        return file + extra;
    }
    return path.join(file, extra);
}

module.exports = function (pdata, request) {

    let query = url.parse(request.url).query;
    let pathname = url.parse(request.url).pathname;

    let realpath = path.join(WEBOX_ROOT, pathname);

    let pathstat = fs.existsSync(realpath) && fs.lstatSync(realpath);

    //文件存在直接返回
    if (pathstat && pathstat.isFile()) {
        pdata.query = query;
        pdata.pathname = pathname;
        pdata.realpath = realpath;
        return;
    }

    //尝试返回默认首页
    for (let index of WEBOX_INDEX) {
        let file = fixpath(realpath, index);
        if (fs.existsSync(file)) {
            pdata.query = query;
            pdata.pathname = fixpath(pathname, index);
            pdata.realpath = file;
            return;
        }
    }

    //文件不存在
    pdata.query = query;
    pdata.pathname = pathname;
    pdata.realpath = '';

};
