import Benchmark from 'benchmark'
import pluralize from 'numd'
import createTranslate from './src'
import translation from './fixture'

let translate

new Benchmark.Suite()
  .add('createTranslate', () => {
    translate = createTranslate(translation, {pluralize})
  })
  .on('cycle', event => {
    console.log(String(event.target))
  })
  .run()

new Benchmark.Suite()
  .add('base translate', () => {
    translate('foo')
  })
  .add('nested translate', () => {
    translate('bar.foo')
  })
  .add('translate with param', () => {
    translate('bar.baz', 'foo')
  })
  .add('translate with function', () => {
    translate('bar.foobar', 'bar', 2)
  })
  .on('cycle', event => {
    console.log(String(event.target))
  })
  .run()
