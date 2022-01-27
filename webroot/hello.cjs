module.exports = function (obj, next) {
    next({ file: 'hello.cjs', obj }, 200);
};
