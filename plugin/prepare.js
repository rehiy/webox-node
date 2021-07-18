let fs = require('fs');
let url = require('url');
let path = require('path');

let { WEBOX_ROOT, WEBOX_INDEX } = require('../helper/config');

/////////////////////////////////////////////////////////////
// create handler

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
    if (pathstat && pathstat.isDirectory()) {
        for (let index of WEBOX_INDEX) {
            let real = path.join(realpath, index);
            if (fs.existsSync(real)) {
                pdata.query = query;
                pdata.pathname = path.join(pathname, index);
                pdata.realpath = real;
                return;
            }
        }
    }

    //文件不存在
    pdata.query = query;
    pdata.pathname = pathname;
    pdata.realpath = '';

};
