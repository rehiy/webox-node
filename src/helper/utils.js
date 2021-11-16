let { config } = require('./config');

/**
 * 兼容调试工具
 */
if (console.parse === undefined) {
    console.parse = Function;
}

/**
 * 输出格式日志
 * 
 * @param {number} level 日志级别
 * @param {...any} msg 日志内容
 */
function logger(level, ...msg) {

    if (config.mode !== 'development' && level > 0) {
        return;
    }

    let time = '[' + dateFormat('yyyy-MM-dd hh:mm:ss') + ']';
    console.log(time, 'Webox -', ...msg);

}

/**
 * 尝试解析JSON
 * 成功返回结果，失败返回`undefined`
 * 
 * @param {string} str JSON字符串
 */
function parseJSON(str) {

    if (typeof str === 'string') {
        try {
            return JSON.parse(str);
        } catch (e) {
            // error
        }
    }

}

/**
 * 时间格式化
 * 
 * @param {string} fmt 格式化选项
 * @param {Date} date 日期对象，默认为当前时间
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

/////////////////////////////////////////////////////////////

module.exports = {
    logger: logger,
    parseJSON: parseJSON,
    dateFormat: dateFormat
};
