import test from 'ava'
import pluralize from 'numd'
import createTranslate from './src'
import translation from './fixture'

const echo = v => v
const translate = createTranslate(translation, {echo, pluralize})

test(t => {
  t.is(translate('foo'), 'foofoo')
  t.is(translate('bar.foo'), 'barbar')
  t.is(translate('bar.baz', 'foo'), 'bazbaz foo')
  t.is(translate('bar.foobar', 'bar', 2), 'foobar foo bar 2 foos')
  t.is(translate('bar.foobarbaz', 'foo'), 'foobarbaz foo')
})
