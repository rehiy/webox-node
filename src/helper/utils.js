let { WEBOX_ERROR } = require('./config');

function logger(...msg) {
    console.log('[' + dateFormat('yyyy-MM-dd hh:mm:ss') + ']', 'Webox -', ...msg);
}

function parseJSON(str) {
    if (typeof str == 'string') {
        try {
            return JSON.parse(str);
        } catch (e) {
            return false;
        }
    }
    return false;
}

function dateFormat(fmt, date) {
    let d = date || new Date();
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

function httpMessage(response, code, text, type) {
    if (WEBOX_ERROR[code]) {
        text = WEBOX_ERROR[code].replace('%s', text);
    }
    response.writeHead(code || 200, {
        'Content-Length': text.length,
        'Content-Type': type || 'text/plain'
    });
    response.write(text);
    response.end();
}

if (console.light === undefined) {
    console.light = Function;
}

module.exports = {
    logger: logger,
    parseJSON: parseJSON,
    dateFormat: dateFormat,
    httpMessage: httpMessage
};
