Function.prototype.myCall = function(context, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('this must be a function');
    }
    context = context || window;
    const fn = Symbol('fn');
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result;
}

Function.prototype.myApply = function(context, args = []) {
    if (typeof this !== 'function') {
        throw new TypeError('this must be a function');
    }
    context = context || window;
    const fn = Symbol('fn');
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result;
}

Function.prototype.myBind = function(context, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('this must be a function');
    }
    const _this = this;
    return function(...newArgs) {
        return _this.apply(context, [...args, ...newArgs]);
    }
}