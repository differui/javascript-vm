const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const resolve = require('rollup-plugin-node-resolve')
const buble = require('rollup-plugin-buble')

export default {
  entry: './src/index.js',
  dest: './dest/bundle.js',
  format: 'cjs',
  plugins: [
    buble({
      exclude: 'node_modules/**'
    }),
    commonjs({
      namedExports: {
        'node_modules/esprima/dist/esprima.js': [
          'parse',
        ],
      }
    }),
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
}
