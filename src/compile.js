const paramRegExp = /((?:\(\w+[^()]+)?\$\w+(?:[^()]*\))?)/g
const functionRegExp = /\((\w+)\s(.+)\)/

const isObject = (value) => Object.prototype.toString.call(value) === '[object Object]'

export default function compile (translation, helpers) {
  const nestedTranslation =
    Array.isArray(translation) || isObject(translation)

  if (nestedTranslation) {
    const compiled = {}

    for (const key in translation) {
      compiled[key] = compile(translation[key], helpers)
    }

    return compiled
  }

  const compilationIsNotNeeded =
    typeof translation !== 'string' ||
    translation.match(paramRegExp) === null

  if (compilationIsNotNeeded) {
    return () => translation
  }

  const instructions = translation
    .split(paramRegExp)
    .map(decl => {
      const paramIndex = decl.search(/\$\w+/)

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

    if (args.length === 1 && isObject(args[0])) {
      Object.keys(args[0]).forEach(key => {
        params[`$${key}`] = args[0][key]
      })
    } else if (args.length > 0) {
      for (let i = 0; i < args.length; i++) {
        params[`$${i + 1}`] = args[i]
      }
    }

    return instructions.reduce((acc, decl) => acc + decl(params), '')
  }
}
