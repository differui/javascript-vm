const REG_NAME = [GLOBAL_NAME,'document','createElement','script','text','console.log(123)','async',true,'defer',false,'document','body','appendChild']
const el = REG_NAME[0][REG_NAME[1]][REG_NAME[2]]

el[REG_NAME[4]] = REG_NAME[5]
el[REG_NAME[6]] = REG_NAME[7]
el[REG_NAME[8]] = REG_NAME[9]
REG_NAME[0][REG_NAME[10]][REG_NAME[11]][REG_NAME[12]](el)
