import { iterGet } from '../src';

describe('iter-get test suite', () => {
  function* genString(): IterableIterator<string> {
    yield '';
    yield 'the first';
    yield 'the second';
  }

  function* genNumber(): IterableIterator<number | undefined> {
    yield undefined;
    return 25;
  }

  function* genFalsy(): IterableIterator<unknown> {
    yield '';
    yield 0;
    yield null;
    yield 'result';
    yield 'the second';
  }

  function* genVoid(): IterableIterator<void> {
    yield;
  }

  it('basic usage', () => {
    const iString = genString();
    expect(iterGet(iString)).toBe('');

    const iVoid = genVoid();
    expect(iterGet(iVoid)).toBe(undefined);

    const iNumber = genNumber();
    expect(iterGet(iNumber)).toBe(25);
  });

  it('option `dflt`', () => {
    const iVoid = genVoid();
    expect(iterGet(iVoid, { dflt: 'NULL' })).toBe('NULL');

    const iNumber = genNumber();
    expect(iterGet(iNumber, { dflt: NaN })).toBe(25);
  });

  it('option `skip`', () => {
    const iString = genString();
    expect(iterGet(iString, { skip: (value) => !value })).toBe('the first');

    const iNumber = genNumber();
    expect(iterGet(iNumber, { dflt: 7, skip: (value) => value === undefined || value % 5 === 0 })).toBe(7);

    const iFalsy1 = genFalsy();
    expect(iterGet<unknown, null>(iFalsy1, { dflt: null, skip: (value) => !value })).toBe('result');

    const iFalsy2 = genFalsy();
    expect(
      iterGet<unknown, null>(iFalsy2, { dflt: null, skip: (value) => !value || typeof value === 'string' }),
    ).toBe(null);
  });

  it('option `find`', () => {
    const iString = genString();
    expect(iterGet(iString, { find: (value) => value.includes('second') })).toBe('the second');

    const iNumber = genNumber();
    expect(iterGet(iNumber, { find: (value) => !!value && value > 30, dflt: 7 })).toBe(7);

    const iFalsy = genFalsy();
    expect(iterGet<unknown>(iFalsy, { find: (value) => value === 0, dflt: null })).toBe(0);
  });
});

describe('iter-get "readme" suite', () => {
  it('default behaviour (usage without options)', () => {
    const source = {
      findHere: undefined,
      findThere: undefined,
      foundIt: 'gotcha!',
      unreachable: 'in da house',
    };

    function* gen(): IterableIterator<string | undefined> {
      yield source.findHere;
      yield source.findThere;
      yield source.foundIt;
      yield source.unreachable;
    }

    const iterator = gen();

    expect(iterGet(iterator)).toBe('gotcha!');
  });

  it('option `dflt`', () => {
    function* gen(): IterableIterator<unknown> {
      yield;
      yield;
      yield;
    }

    const iterator = gen();

    expect(iterGet(iterator, { dflt: 'default' })).toBe('default');
  });

  it('option `skip`', () => {
    function* gen(): IterableIterator<unknown> {
      yield '';
      yield 0;
      yield null;
      yield 'result';
      yield 'the second';
    }

    const iterator1 = gen();
    const iterator2 = gen();

    expect(iterGet(iterator1)).toBe('');
    expect(iterGet(iterator2, { skip: (value) => !value })).toBe('result');
  });

  it('options `find`', () => {
    function* gen(): IterableIterator<{ id: number; x: number }> {
      yield { id: 1, x: 0 };
      yield { id: 2, x: 3 };
      yield { id: 3, x: 7 };
      yield { id: 4, x: 2 };
    }

    const iterator = gen();

    expect(iterGet(iterator, { find: (value) => value.x > 5 })).toEqual({ id: 3, x: 7 });
  });
});
