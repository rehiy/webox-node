module.exports = function (obj, next) {
    next({ file: 'hello.cjs', search: obj.search }, 200);
};
