import { readFileSync } from 'fs'
import test from 'ava'
import {
  transform,
  digitize,
  localize,
  linearize,
  GLOBAL_NAME,
  REG_NAME,
  MEM_NAME,
} from '../'

function replace(str) {
  str = str.replace(new RegExp(GLOBAL_NAME, 'g'), 'window')
  str = str.replace(new RegExp(REG_NAME, 'g'), 'REG')
  str = str.replace(new RegExp(MEM_NAME, 'g'), 'MEM')

  return str
}

test('should localize member express', t => {
  const actual = readFileSync('test/fixtures/localize-object/actual.js').toString()
  const expect = readFileSync('test/fixtures/localize-object/expect.js').toString()

  t.is(replace(expect), replace(localize(actual)))
})

test('should transform dot member expression', t => {
  const actual = readFileSync('test/fixtures/dot-member-expression/actual.js').toString()
  const expect = readFileSync('test/fixtures/dot-member-expression/expect.js').toString()

  t.is(replace(expect), replace(transform(actual)))
})

test('should not transform bracket member expression', t => {
  const actual = readFileSync('test/fixtures/bracket-member-expression/actual.js').toString()
  const expect = readFileSync('test/fixtures/bracket-member-expression/expect.js').toString()

  t.is(replace(expect), replace(transform(actual)))
})

test('should digitize literals', t => {
  const actual = readFileSync('test/fixtures/digitize-literal/actual.js').toString()
  const expect = readFileSync('test/fixtures/digitize-literal/expect.js').toString()

  t.is(replace(expect), replace(digitize(actual)))
})

test('should linearize express', t => {
  const actual = readFileSync('test/fixtures/linearize-expression/actual.js').toString()
  const expect = readFileSync('test/fixtures/linearize-expression/expect.js').toString()

  t.is(replace(expect), replace(linearize(actual)))
})
