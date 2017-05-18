const MAX_SIZE = 1024 * 1024
let p = 0

export function alloc() {
  if (p <= MAX_SIZE) {
    return p++
  }

  throw new Error('Memory Exhausted')
}


export function free() {

}
