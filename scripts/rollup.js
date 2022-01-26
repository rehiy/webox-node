import { rm } from 'shelljs';

import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

//////////////////////////////////////////////////////////////////////

rm('-rf', 'dist');

export default {
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
        resolve({
            browser: false
        }),
        commonjs({
            ignoreDynamicRequires: true
        }),
        copy({
            targets: [
                { src: 'README.md', dest: 'dist/README.md' }
            ]
        }),
        terser()
    ]
};
