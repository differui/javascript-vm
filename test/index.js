import { readFileSync } from 'fs'
import test from 'ava'
import { transform } from '../'

test('should transform dot member expression', t => {
  const actual = readFileSync('test/fixtures/dot-member-expression/actual.js').toString()
  const expect = readFileSync('test/fixtures/dot-member-expression/expect.js').toString()

  t.is(expect, transform(actual))
})

test('should not transform bracket member expression', t => {
  const actual = readFileSync('test/fixtures/bracket-member-expression/actual.js').toString()
  const expect = readFileSync('test/fixtures/bracket-member-expression/expect.js').toString()

  t.is(expect, transform(actual))
})
