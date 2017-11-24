const paramRegExp = /((?:\(\w+\s)?\$\d+(?:[^()]+\))?)/g
const functionRegExp = /\((\w+)\s(.+)\)/

const getIndex = decl => Number(decl.substring(1)) - 1

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
        return args => args[getIndex(decl)]
      }

      const options = decl.match(functionRegExp)
      const fn = helpers[options[1]]

      const [index, ...params] = options[2]
        .split(/\|/g)
        .map((d, i) => i === 0 ? getIndex(d) : d)

      return args => fn(args[index], ...params)
    })

  return (...args) => instructions.reduce((acc, decl) => acc + decl(args), '')
}
