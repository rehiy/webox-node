let fs = require('fs');
let url = require('url');
let path = require('path');

/////////////////////////////////////////////////////////////
// parse config

let WEBOX_ROOT = path.resolve(process.env.WEBOX_ROOT);

let WEBOX_INDEX = process.env.WEBOX_INDEX || [
    'index.html', 'index.htm', 'index.cgi'
];

/////////////////////////////////////////////////////////////
// create handler

module.exports = function (pdata, request) {

    let reqfile = url.parse(request.url).pathname;
    let realpath = path.join(WEBOX_ROOT, reqfile);

    let pathstat = fs.existsSync(realpath) && fs.lstatSync(realpath);

    //文件存在直接返回
    if (pathstat && pathstat.isFile()) {
        pdata.reqfile = reqfile;
        pdata.realpath = realpath;
        return;
    }

    //尝试返回默认首页
    if (pathstat && pathstat.isDirectory()) {
        for (let index of WEBOX_INDEX) {
            let real = path.join(realpath, index);
            if (fs.existsSync(real)) {
                pdata.reqfile = reqfile + '/' + index;
                pdata.realpath = real;
                return;
            }
        }
    }

    //文件不存在
    pdata.reqfile = reqfile;
    pdata.realpath = '';

};
