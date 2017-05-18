import { parse as p } from 'esprima'
import * as type from './type'

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

    if (n.property.type !== type.LITERAL) {
      records.push({
        start: n.object.range[0],
        end: n.object.range[1],
      })
      records.push({
        start: n.property.range[0],
        end: n.property.range[1],
      })
    }
  })
}

function stringify() {
  let propertyRecord = records.pop()
  let objectRecord = records.pop()

  while (propertyRecord && objectRecord) {
    const object = source.substring(objectRecord.start, objectRecord.end)
    const property = source.substring(propertyRecord.start, propertyRecord.end)

    source = [
      source.substring(0, objectRecord.start),
      `${object}['${property}']`,
      source.substring(propertyRecord.end),
    ].join('')

    propertyRecord = records.pop()
    objectRecord = records.pop()
  }
}

function main(code) {
  source = code
  records.length = 0

  parse()
  stringify()

  return source
}

export const transform = main
