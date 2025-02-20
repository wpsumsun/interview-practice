/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls
 * to the function return the value of the first invocation.
 *
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * const initialize = once(createApplication)
 * initialize()
 * initialize() // => same result as first call
 */
function once<T extends (...args: any[]) => any>(func: T): (...args: Parameters<T>) => ReturnType<T> {
    let called = false;
    let result: ReturnType<T>;

    return function(this: any, ...args: Parameters<T>): ReturnType<T> {
        if (!called) {
            result = func.apply(this, args);
            called = true;
        }
        return result;
    };
}

export default once;