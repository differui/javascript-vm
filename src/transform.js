import { parse } from 'esprima'

// function replace

function main(code) {
  const ast = parse(code, {
    loc: true,
    range: true,
    comment: true,
    module: true,
  })

  console.log(ast.body[3])
}

export const transform = main
