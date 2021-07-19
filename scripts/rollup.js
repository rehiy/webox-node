import { rm } from 'shelljs';

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

import { terser } from "rollup-plugin-terser";

//////////////////////////////////////////////////////////////////////

rm('-rf', 'dist');

export default {
    input: 'src/index.js',
    output: {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true,
        exports: 'named'
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
        terser()
    ]
};