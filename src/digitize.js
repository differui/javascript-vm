import { parse as p } from 'esprima'
import * as type from './type'
import * as name from './name'

let source
const records = []
const literals = []

function parse() {
  p(source, {
    range: true,
    module: true,
  }, (n) => {
    if (n.type === type.LITERAL) {
      records.push({
        start: n.range[0],
        end: n.range[1],
      })
    }
  })
}

function stringify() {
  let record = records.pop()

  while (record) {
    const literal = source.substring(record.start, record.end)

    literals.unshift(literal)
    source = [
      source.substring(0, record.start),
      `${name.REG_NAME}[${records.length + 1}]`,
      source.substring(record.end),
    ].join('')
    record = records.pop()
  }
}

function prepend() {
  source = [
    `const ${name.REG_NAME} = [${name.GLOBAL_NAME},${literals.join(',')}]`,
    source.replace(new RegExp(name.GLOBAL_NAME, 'g'), `${name.REG_NAME}[0]`),
  ].join('\n')
}

function main(code) {
  source = code
  records.length = 0
  literals.lnegth = 0

  parse()
  stringify()
  prepend()

  return source
}

export const digitize = main
