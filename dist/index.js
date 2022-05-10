export function iterGet(gen, options = {}) {
    const { dflt, find, skip = (value) => value === undefined } = options;
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
//# sourceMappingURL=index.js.map