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
    translate('string')
  })
  .add('nested translate', () => {
    translate('nested.string')
  })
  .add('array translate', () => {
    translate('array.0')
  })
  .add('translate with param', () => {
    translate('nested.param', 'param')
  })
  .add('translate with function', () => {
    translate('nested.complex', 'param', 2)
  })
  .on('cycle', event => {
    console.log(String(event.target))
  })
  .run()
