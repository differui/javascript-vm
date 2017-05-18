import { parse as p } from 'esprima'
import * as type from './type'
import * as name from './name'

let source
const records = []

function parse() {
  p(source, {
    range: true,
    module: true,
  }, (n) => {
    if (n.type !== type.MEMBER_EXPRESSION) {
      return
    }

    if (n.object.type === type.IDENTIFIER) {
      records.push({
        start: n.object.range[0],
        end: n.object.range[1],
      })
    }
  })
}

function stringify() {
  let record = records.pop()

  while (record) {
    const object = source.substring(record.start, record.end)

    source = [
      source.substring(0, record.start),
      `${name.GLOBAL_NAME}.${object}`,
      source.substring(record.end),
    ].join('')
    record = records.pop()
  }
}

function main(code) {
  source = code
  records.length = 0

  parse()
  stringify()

  return source
}

export default const localize = main
