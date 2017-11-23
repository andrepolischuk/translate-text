import test from 'ava'
import pluralize from 'numd'
import createTranslate from './src'
import translation from './fixture'

const translate = createTranslate(translation, {pluralize})

test(t => {
  t.is(translate('foo'), 'foofoo')
  t.is(translate('bar.foo'), 'barbar')
  t.is(translate('bar.baz', 'foo'), 'bazbaz foo')
  t.is(translate('bar.foobar', 'bar', 2), 'foobar foo bar 2 foos')
})
