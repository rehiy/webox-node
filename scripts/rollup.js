import { rm } from 'shelljs';

import { terser } from 'rollup-plugin-terser';

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

//////////////////////////////////////////////////////////////////////

rm('-rf', 'dist');

export default {
    input: ['src/app.js', 'src/index.js'],
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
