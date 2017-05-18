const el = GLOBAL_NAME['document']['createElement']('script')

el['text'] = 'console.log(123)'
el['async'] = true
el['defer'] = false
GLOBAL_NAME['document']['body']['appendChild'](el)
