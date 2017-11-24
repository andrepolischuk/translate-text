const paramRegExp = /((?:\(\w+[^()]+)?\$\d+(?:[^()]*\))?)/g
const functionRegExp = /\((\w+)\s(.+)\)/

export default function compile (translation, helpers) {
  if (Object.prototype.toString.call(translation) === '[object Object]') {
    for (const key in translation) {
      translation[key] = compile(translation[key], helpers)
    }

    return translation
  }

  if (typeof translation !== 'string' || paramRegExp.test(translation) === false) {
    return () => translation
  }

  const instructions = translation
    .split(paramRegExp)
    .map(decl => {
      const paramIndex = decl.search(/\$\d+/)

      if (paramIndex === -1) {
        return () => decl
      }

      if (paramIndex === 0) {
        return params => params[decl]
      }

      const options = decl.match(functionRegExp)
      const fn = helpers[options[1]]
      const args = options[2].split(/\|/g)

      return params => fn(...args.map(a => params[a] || a))
    })

  return args => {
    const params = {}

    if (args.length > 0) {
      for (let i = 0; i < args.length; i++) {
        params[`$${i + 1}`] = args[i]
      }
    }

    return instructions.reduce((acc, decl) => acc + decl(params), '')
  }
}
