let { WEBOX_ERROR } = require('./config');

function logger() {
    let arg1 = ['[' + dateFormat('yyyy-MM-dd hh:mm:ss') + ']', 'Webox -'];
    let arg2 = Array.prototype.slice.call(arguments);
    console.log.apply(null, arg1.concat(arg2));
}

function httpMessage(response, code, text) {
    text = WEBOX_ERROR[code].replace('%s', text);
    response.writeHead(code, {
        'Content-Type': 'text/plain'
    });
    response.write(text);
    response.end();
}

function dateFormat(fmt) {
    let d = new Date();
    let o = {
        'M+': d.getMonth() + 1, //月
        'd+': d.getDate(), //日
        'h+': d.getHours(), //时
        'm+': d.getMinutes(), //分
        's+': d.getSeconds(), //秒
        'q+': Math.floor((d.getMonth() + 3) / 3), //季度
        'S': d.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) { //年
        fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
}

module.exports = {
    logger: logger,
    httpMessage: httpMessage
};
