let fs = require('fs');
let path = require('path');

let { WEBOX_ROOT, WEBOX_INDEX } = require('../helper/config');

/////////////////////////////////////////////////////////////

function fixpath(file, extra) {
    if (extra.indexOf('.') === 0) {
        return file + extra;
    }
    return path.join(file, extra);
}

module.exports = function (pdata, request, response) {

    let filepath = path.join(WEBOX_ROOT, pdata.url.pathname);

    let pathstat = fs.existsSync(filepath) && fs.lstatSync(filepath);

    //文件存在直接返回
    if (pathstat && pathstat.isFile()) {
        pdata.filepath = filepath;
        return;
    }

    //尝试返回默认首页
    for (let index of WEBOX_INDEX) {
        let file = fixpath(filepath, index);
        if (fs.existsSync(file)) {
            pdata.filepath = file;
            return;
        }
    }

    //文件不存在
    pdata.filepath = '';

};
