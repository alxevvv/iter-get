"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterGet = void 0;
function iterGet(gen, options) {
    if (options === void 0) { options = {}; }
    var dflt = options.dflt, find = options.find, _a = options.skip, skip = _a === void 0 ? function (value) { return value === undefined; } : _a;
    do {
        var _b = gen.next(), value = _b.value, done = _b.done;
        if (!skip(value) && (!find || find(value))) {
            return value;
        }
        if (done) {
            return dflt;
        }
    } while (true);
}
exports.iterGet = iterGet;
//# sourceMappingURL=index.js.map