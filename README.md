# iter-get

Returns the first iterator value that matches the condition.

---

## Installation

```
npm i iter-get
```

or

```
yarn add iter-get
```

## Usage

```javascript
import { iterGet } from 'iter-get';

iterGet(iterator, options?);
```

By default it returns the first _defined_ value received from the iterator:

```javascript
const source = {
  findHere: undefined,
  findThere: undefined,
  foundIt: 'gotcha!',
  unreachable: 'in da house',
};

function* gen() {
  yield source.findHere;
  yield source.findThere;
  yield source.foundIt;
  yield source.unreachable;
}

const iterator = gen();

iterGet(iterator); // 'gotcha!'
```

## Options

### `options.dflt?: any`

> default: `undefined`

The default value returned after the iterator has done:

```javascript
function* gen() {
  yield;
  yield;
  yield;
}

const iterator = gen();

iterGet(iterator, { dflt: 'default' }); // 'default'
```

### `options.skip?: (value) => boolean`

> default: `(value) => value === undefined`

A callback that determines whether the current iterator value should be skipped:

```javascript
function* gen() {
  yield '';
  yield 0;
  yield null;
  yield 'result';
  yield 'the second';
}

const iterator1 = gen();
const iterator2 = gen();

iterGet(iterator1); // ''
iterGet(iterator2, { skip: (value) => !value }); // 'result'
```

### `options.find?: (value) => boolean`

> default: `undefined`

If passed, returns the value for which the callback returns true:

```javascript
function* gen() {
  yield { id: 1, x: 0 };
  yield { id: 2, x: 3 };
  yield { id: 3, x: 7 };
  yield { id: 4, x: 2 };
}

const iterator = gen();

iterGet(iterator, { find: (value) => value.x > 5 }); // { id: 3, x: 7 }
```

## License

Licensed under the MIT license. Copyright (c) 2022 Vladislav Alexeev
