import get from 'lodash.get'
import compile from './compile'

export default function createTranslate (translation, fns = {}) {
  const compiledTranslation = compile(translation, fns)

  return (key, ...args) => {
    const translate = get(compiledTranslation, key)

    if (typeof translate === 'function') {
      return translate(...args)
    }

    return key
  }
}
