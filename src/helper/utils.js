let config = require('./config');

/**
 * 控制台日志
 * @param {number} level 日志级别
 * @param  {...any} msg 日志内容
 */

function logger(level, ...msg) {

    if (config.WEBOX_MODE !== 'development' && level > 0) {
        return;
    }

    let time = '[' + dateFormat('yyyy-MM-dd hh:mm:ss') + ']';
    console.log(time, 'Webox -', ...msg);

}

/**
 * 时间格式化
 * @param {string} fmt 格式化选项
 * @param {Date} date 日期对象，默认为当前时间
 * @returns 格式化后的字符串
 */

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
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }

    return fmt;

}

/**
 * 尝试解析JSON
 * @param {string} str JSON字符串
 * @returns 成功返回结果，失败返回`undefined`
 */

function parseJSON(str) {

    if (typeof str === 'string') {
        try {
            return JSON.parse(str);
        } catch (e) {
        }
    }

}

/**
 * 输出HTTP消息
 * @param {http.ServerResponse} response 响应对象
 * @param {string | object} output 输出内容
 * @param {number} code 状态码
 * @param {string} mime 内容类型
 */

function httpMessage(response, output, code, mime) {

    code = code || 200;
    mime = mime || 'text/plain';

    if (typeof output === 'object') {
        output = JSON.stringify(output);
        mime = 'application/json';
    }

    if (mime == 'text/plain' && config.WEBOX_ERROR[code]) {
        output = config.WEBOX_ERROR[code].replace('%s', output);
    }

    response.writeHead(code, {
        'Content-Length': output.length,
        'Content-Type': mime
    });

    response.write(output);
    response.end();

}

/**
 * 仅用于兼容老版调试工具
 */

if (console.light === undefined) {
    console.light = Function;
}

module.exports = {
    logger: logger,
    parseJSON: parseJSON,
    dateFormat: dateFormat,
    httpMessage: httpMessage
};
