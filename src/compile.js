const paramRegExp = /((?:\(\w+\s)?\$\d+(?:[^()]+\))?)/g
const functionRegExp = /\((\w+)\s(.+)\)/

const hasParam = decl => paramRegExp.test(decl)
const hasFunction = decl => functionRegExp.test(decl)
const getIndex = decl => Number(decl.substring(1)) - 1

export default function compile (translation, fns) {
  if (Object.prototype.toString.call(translation) === '[object Object]') {
    return Object
      .keys(translation)
      .reduce((acc, key) => ({
        ...acc,
        [key]: compile(translation[key], fns)
      }), {})
  }

  if (typeof translation !== 'string' || !hasParam(translation)) {
    return () => translation
  }

  const instructions = translation
    .split(paramRegExp)
    .map(decl => {
      if (!hasParam(decl)) {
        return () => decl
      }

      if (hasFunction(decl)) {
        const options = decl.match(functionRegExp)
        const fn = fns[options[1]]

        const [index, ...params] = options[2]
          .split(/\|/g)
          .map((d, i) => i === 0 ? getIndex(d) : d)

        return args => fn(args[index], ...params)
      }

      const index = getIndex(decl)
      return args => args[index]
    })

  return (...args) => instructions.reduce((acc, decl) => acc + decl(args), '')
}
