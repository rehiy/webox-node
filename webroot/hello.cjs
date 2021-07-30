module.exports = function (obj, next) {
    next(200, { file: 'hello.cjs', search: obj.search });
};
