export type TIterValueCallback<V, R> = (value: V) => R;

export interface IIterGetOptions<V, D> {
  dflt?: D;
  find?: TIterValueCallback<V, boolean>;
  skip?: TIterValueCallback<V, boolean>;
}

export function iterGet<V = unknown, D = V | undefined>(
  gen: IterableIterator<V>,
  options: IIterGetOptions<V, D> = {},
): V | D | undefined {
  const { dflt, find, skip = (value): boolean => value === undefined } = options;

  do {
    const { value, done } = gen.next();

    if (!skip(value) && (!find || find(value))) {
      return value;
    }

    if (done) {
      return dflt;
    }
  } while (true);
}
