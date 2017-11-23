# translate-text [![Build Status][travis-image]][travis-url]

> Translate function with templates precompiling and helpers

## Install

```sh
npm install --save translate-text
```

## Usage

```js
import createTranslate from 'translate-text'
import pluralize from 'numd'

const translation = {
  hello: 'Hello',
  echo: 'You say: $1',
  more: {
    age: 'I\'m a (pluralize $1|year|years) old'
  }
}

const translate = createTranslate(translation, {pluralize})

translate('hello') // Hello
translate('echo', 'Foo') // You say: Foo
translate('more.age', 25) // I'm a 25 years old
```

## API

### createTranslate(translation[, fns])

Compile templates and return translate function.

#### translation

Type: `object`

Translation templates.

#### fns

Type: `object`

Helper functions that are used in templates.

### translate(key[, ...args])

#### key

Type: `string`

Template key.

#### args

Type: `...any`

Arguments to insert into the template.

## License

MIT

[travis-url]: https://travis-ci.org/andrepolischuk/translate-text
[travis-image]: https://travis-ci.org/andrepolischuk/translate-text.svg?branch=master
