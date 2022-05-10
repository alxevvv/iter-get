export declare type TIterValueCallback<V, R> = (value: V) => R;
export interface IIterGetOptions<V, D> {
    dflt?: D;
    find?: TIterValueCallback<V, boolean>;
    skip?: TIterValueCallback<V, boolean>;
}
export declare function iterGet<V = unknown, D = V | undefined>(gen: IterableIterator<V>, options?: IIterGetOptions<V, D>): V | D | undefined;
