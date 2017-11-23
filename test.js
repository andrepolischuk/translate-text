import test from 'ava'
import pluralize from 'numd'
import createTranslate from './src'

const translation = {
  foo: 'foofoo',
  bar: {
    foo: 'barbar',
    baz: 'bazbaz $1',
    foobar: 'foobar foo $1 (pluralize $2|foo|foos)'
  }
}

const translate = createTranslate(translation, {pluralize})

test(t => {
  t.is(translate('foo'), 'foofoo')
  t.is(translate('bar.foo'), 'barbar')
  t.is(translate('bar.baz', 'foo'), 'bazbaz foo')
  t.is(translate('bar.foobar', 'bar', 2), 'foobar foo bar 2 foos')
})
