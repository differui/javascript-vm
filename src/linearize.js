import { parse as p } from 'esprima'
import { alloc } from './memory'
import * as name from './name'
import * as type from './type'

let source
const memMap = []
const varMap = []
const statements = []

// const identifier = value
function isDeclarator(n) {
  return n.type === type.VARIABLE_DECLARATOR &&
    n.id.type === type.IDENTIFIER
}

// const REG_NAME = [...]
function isRegDeclarator(n) {
  return n.id.type === type.IDENTIFIER &&
    n.id.name === name.REG_NAME &&
    n.init &&
    n.init.type === type.ARRAY_EXPRESSION
}

// method()
function isCallDeclarator(n) {
  return n.id.type === type.IDENTIFIER &&
    n.init &&
    n.init.type === type.CALL_EXPRESSION
}

// object[property]
function isMemberExpressionDeclarator(n) {
  return n.id.type === type.IDENTIFIER &&
    n.init &&
    n.init.type === type.MEMBER_EXPRESSION
}

// REG_NAME[p]
function isRegMemberExpression(n) {
  return n &&
    n.type === type.MEMBER_EXPRESSION &&
    n.object.type === type.IDENTIFIER &&
    n.object.name === name.REG_NAME &&
    typeof n.property.value === 'number'
}

// identifier = value
function isAssignmentExpression(n) {
  return n &&
    n.type === type.ASSIGNMENt_EXPRESSION
}

// method()
function isCallExpression(n) {

}

function expandMemberExpressionDeclarator(n) {
  let [ , p ] = varMap.find(([ id ]) => id === n.id.name) || []

  if (!p) {
    p = alloc()
    varMap.push([
      n.id.name,
      p,
    ])
  }

  expandMemberExpression(n.init).forEach((statement, i) => {
    if (i === 0) {
      statements.push(`${name.MEM_NAME}[${p}] = ${statement}`)
    } else {
      statements.push(`${name.MEM_NAME}[${p}] = ${name.MEM_NAME}[${p}][${statement}]`)
    }
  })
}

function expandMemberExpression(n) {
  const rtn = []
  let cur = n

  while (isRegMemberExpression(cur.property)) {
    let [ , p ] = memMap.find(([ , p ]) => p === cur.property.property.value)

    rtn.unshift(`${name.MEM_NAME}[${p}]`)
    cur = cur.object
  }

  if (isRegMemberExpression(cur)) {
    let [ , p ] = memMap.find(([ , p ]) => p === cur.property.value)

    rtn.unshift(`${name.MEM_NAME}[${p}]`)
  }

  return rtn
}

function expandRegDeclarator(n) {
  n.init.elements.forEach((e, i) => {
    let p = alloc()

    memMap.push([ i, p ])
    statements.push(`${name.MEM_NAME}[${p}] = ${name.REG_NAME}[${i}]`)
  })
}

function parse() {
  p(source, {
    range: true,
    module: true,
  }, (n) => {
    if (isDeclarator(n)) {
      if (isRegDeclarator(n)) {
        expandRegDeclarator(n)
      } else if (isMemberExpressionDeclarator(n)) {
        expandMemberExpressionDeclarator(n)
      } else if (isCallDeclarator(n)) {
        expandCallDeclarator(n)
      }
    } else if (isAssignmentExpression(n)) {

    } else if (isCallExpression(n)) {

    }

    throw new Error(`${n.type} is not support yet.`)
  })
}

function stringify() {
  console.log(statements.join('\n'))
}

function main(code) {
  source = code
  statements.length = 0

  parse()
  stringify()

  return statements.join('\n')
}

export const linearize = main
