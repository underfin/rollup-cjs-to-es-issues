const builtins = require('rollup-plugin-node-builtins')
const globals = require('rollup-plugin-node-globals')

const builtinsPlugin = builtins({crypto: true});
builtinsPlugin.name = 'builtins'; // required, see https://github.com/vitejs/vite/issues/728

const globalsPlugin = globals();
globalsPlugin.name = 'globals'; // required, see https://github.com/vitejs/vite/issues/728

const rollup = require('rollup')

 rollup.rollup({
  input: './input.js',
  plugins: [
    require('@rollup/plugin-commonjs')({
      extensions: ['.js', '.cjs'],
      transformMixedEsModules: true
    }),
    globalsPlugin,
    builtinsPlugin,

    require('@rollup/plugin-node-resolve').nodeResolve({
      rootDir: process.cwd(),
      extensions:  ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
      preferBuiltins: false,
      dedupe: [],
      mainFields: ['module', 'jsnext', 'jsnext:main', 'browser', 'main']
    }),
    require('@rollup/plugin-json')({
      preferConst: true,
      indent: '  ',
      compact: false,
      namedExports: true
    }),
  ]
}).then((bundle) => {
   bundle.write({
     file: 'output.js',
     format: 'es',
     exports: 'named',
     entryFileNames: '[name].js',
     chunkFileNames: 'common/[name]-[hash].js'
   })
 })


