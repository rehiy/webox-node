let { config } = require('./config');

/**
 * 输出HTTP消息
 * 
 * @param {object} response http.ServerResponse
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

    if (mime == 'text/plain' && config.error[code]) {
        output = config.error[code].replace('%s', output);
    }

    response.writeHead(code, {
        'Content-Length': output.length,
        'Content-Type': mime
    });

    response.write(output);
    response.end();

}

/////////////////////////////////////////////////////////////

module.exports = {
    httpMessage: httpMessage
};
