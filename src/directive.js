const gen = (
  function *createCodeGenerator() {
    let count = 0

    while (count <= 255) {
      yield count.toString(2).padStart(8, 0)
      count++
    }
  }
)()

function getCode() {
  const { value, done } = gen.next()

  if (done) {
    throw new Error('Code Exhausted')
  }

  return value
}

// Load variable from register
//
// MEM[position1] = REG[position2] => LDR [position1] [position2]
export const LDR = getCode()

// Update variable in register
//
// REG[position1] = MEM[position2] => UDR [position1] [position2]
export const UDR = getCode()

// Get object property
//
// MEM[position1] = MEM[position2][MEM[position3]] => GET [position1] [position2] [position3]
export const GET = getCode()

// Set object property
//
// MEM[psoitino1][MEM[position2]] = MEM[position3] => SET [position1] [position2] [position3]
export const SET = getCode()

// Call function
//
// MEM[position](MEM[position1]...) => CAL [position] [position1]...
export const CAL = getCode()
