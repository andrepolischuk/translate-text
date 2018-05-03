import test from 'ava'
import pluralize from 'numd'
import createTranslate from './src'
import translation from './fixture'

const echo = v => v
const translate = createTranslate(translation, {echo, pluralize})

test('simple', t => {
  t.is(translate('string'), 'string')
})

test('nested', t => {
  t.is(translate('nested.string'), 'nested string')
  t.is(translate('nested.param', 'param'), 'nested param')
  t.is(translate('nested.function', 'value'), 'nested function with value')
  t.is(translate('nested.complex', 'param', 2), 'nested param and function with 2 values')
})

test('array', t => {
  t.is(translate('array.0'), 'string')
  t.is(translate('array.1', 'value'), 'function with value')
})
