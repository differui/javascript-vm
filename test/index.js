import { readFileSync } from 'fs'
import test from 'ava'
import { transform } from '../'

test('should transform basic code', t => {
  const actual = readFileSync('test/fixtures/basic/actual.js').toString()
  const expect = readFileSync('test/fixtures/basic/expect.js').toString()

  t.is(expect, transform(actual))
})

