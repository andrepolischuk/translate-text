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
  },
  greeting: 'I\m $name and I\'m (pluralize $age|year|years) old'
}

const translate = createTranslate(translation, {pluralize})

translate('hello') // Hello
translate('echo', 'Foo') // You say: Foo
translate('more.age', 25) // I'm a 25 years old
translate('greeting', {
  name: 'John Smith',
  age: 25
}) // I'm John Smith and I'm 25 years old
```

## API

### createTranslate(translation[, helpers])

Compile templates and return translate function.

#### translation

Type: `object`

Translation templates.

#### helpers

Type: `object`

Helper functions that are used in templates.

### translate(key[, ...args])

#### key

Type: `string`

Template key.

#### args

Type: `...any`

Arguments to insert into the template.

## Related

* [react-translate-text][react-translate-text] — React higher-order component for text translation

## License

MIT

[travis-url]: https://travis-ci.org/andrepolischuk/translate-text
[travis-image]: https://travis-ci.org/andrepolischuk/translate-text.svg?branch=master

[react-translate-text]: https://github.com/andrepolischuk/react-translate-text
