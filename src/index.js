import {get} from 'dot-prop'
import compile from './compile'

export default function createTranslate (translation, helpers = {}) {
  const cache = {}
  const compiled = compile(translation, helpers)

  return (key, ...args) => {
    if (cache[key] != null && args.length === 0) {
      return cache[key]
    }

    if (cache[key] == null) {
      cache[key] = get(compiled, key)
    }

    const translate = cache[key]

    if (typeof translate !== 'function') {
      return key
    }

    const translated = translate(args)

    if (args.length === 0) {
      cache[key] = translated
    }

    return translated
  }
}
