import { rm } from 'shelljs';

import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

//////////////////////////////////////////////////////////////////////

rm('-rf', 'dist');

export default {
    input: ['src/index.js', 'src/cli.js'],
    output: {
        dir: 'dist',
        format: 'cjs',
        sourcemap: false,
        exports: 'auto'
    },
    external: [
    ],
    plugins: [
        copy({
            targets: [
                { src: 'README.md', dest: 'dist' },
            ]
        }),
        resolve({
            browser: false
        }),
        commonjs({
            ignoreDynamicRequires: true
        }),
        terser()
    ]
};
