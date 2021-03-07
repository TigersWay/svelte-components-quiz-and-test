import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import svelte from 'rollup-plugin-svelte';
import css from 'rollup-plugin-css-only';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/main.js',
  output: {
    file: 'docs/bundle.js',
    // format: 'iife',
    // sourcemap: true,
  },
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
        // dev: true
      },
    }),
    css({ output: 'bundle.css' }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    terser({output: {comments: false}})
  ]
};
