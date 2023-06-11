const shell = require('shelljs');

const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const resolve = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const run = require('@rollup/plugin-run');
const terser = require('@rollup/plugin-terser');

const copy = require('rollup-plugin-copy');

//////////////////////////////////////////////////////////////////////

const dev = process.env.ROLLUP_WATCH === 'true';

shell.rm('-rf', 'dist');

module.exports = {
    input: ['src/main.js', 'src/cli.js'],
    output: {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true,
        exports: 'auto'
    },
    external: [
    ],
    plugins: [
        copy({
            targets: [
                { src: 'README.md', dest: 'dist' }
            ]
        }),
        resolve({
            browser: false
        }),
        commonjs({
            ignoreDynamicRequires: true
        }),
        json(),
        replace({
            preventAssignment: true,
            // 'require.main': 'null'
        }),
        dev ? run() : terser(),
    ]
};
