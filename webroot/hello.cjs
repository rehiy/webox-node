module.exports = function (input, next) {
    next({ file: 'hello.cjs', input }, 200);
};
