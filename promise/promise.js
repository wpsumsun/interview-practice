const PENDING = 'pengding';
const FUFILLED = 'fufilled';
const REJECTED = 'rejected';

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        reject(new TypeError('Chaining cycle detected for promise'));
        return;
    }
    
    let called = false;

    if (x && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then();
            if (typeof then === 'function') {
                then.call(x,
                    y => {
                        if (called) return;
                        called = true;
                        resolvePromise(promise2, y, resolve, reject);
                    },
                    r => {
                        if (called) return;
                        called = true;
                        reject(r);
                    }
                )
            } else {
                resolve(x);
            }
        } catch (error) {
            if (called) return;
            called = true;
            reject(error);
        }
    } else {
        resolve(x);
    }
}

class mPromise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FUFILLED;
                this.value = value;
                this.onFulfilledCallbacks.forEach(fn => fn());
            }
        }

        const reject = reason => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };

        const promise2 = new mPromise((resolve, reject) => {
            if (this.status === FUFILLED) {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                })
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                })
            }
            if (this.status === PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    })
                });
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    })
                });
            }
        })
        return promise2;
    }

    static resolve(value) {
        if (value instanceof mPromise) {
            return value;
        }
        return new mPromise((resolve, reject) => {
            resolve(data);
        })
    }

    static reject(reason) {
        return new mPromise((resolve, reject) => reject(reason));
    }
    /**
     * 接收一个 Promise 数组，返回一个新的 Promise
     * 只有当所有 Promise 都成功时才成功，返回值为所有 Promise 结果的数组
     * 只要有一个 Promise 失败就立即失败
     */
    static all(promises) {
        return new mPromise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                reject(new TypeError('promises must be an array'));
                return;
            }

            const results = [];
            let count = 0;

            if (promises.length === 0) {
                resolve(results);
                return;
            }
            
            promises.forEach((promise, index) => {
                mPromise.resolve(promise).then(
                    value => {
                        results[index] = value;
                        count++;
                        if (count === promises.length) {
                            resolve(results);
                        }
                    },
                    reason => {
                        reject(reason);
                    }
                )
            })
        })
    }

     /**
     * 接收一个 Promise 数组，返回一个新的 Promise
     * 返回第一个完成的 Promise 的结果，无论是成功还是失败
     */
    static race(promises) {
        return new mPromises((resolve, reject) => {
            if (!Array.isArray(promises)) {
                reject(new TypeError('promises must be an array'));
                return;
            }
            
            // 空数组的情况下，Promise 会永远处于 pending 状态
            promises.forEach(promise => {
                mPromise.resolve(promise).then(resolve, reject);
            })
        })
    }

     /**
     * 接收一个 Promise 数组，返回一个新的 Promise
     * 只要有一个 Promise 成功就返回这个成功结果
     * 只有当所有 Promise 都失败时才失败，返回值为所有失败原因的数组
     */
    static any(promises) {
        return new mPromise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                reject(new TypeError('promises must be an array'));
                return;
            }

            const errors = [];
            let count = 0;

            // 处理空数组的情况
            if (promises.length === 0) {
                reject(new AggregateError([], 'All promises were rejected'));
                return;
            }

            promises.forEach((promise, index) => {
                mPromise.resolve(promise).then(
                    value => {
                        resolve(value);
                    },
                    reason => {
                        errors[index] = reason;
                        count++;
                        if (count === promises.length) {
                            reject(new AggregateError(errors, 'All promises were rejected'));
                        }
                    }
                )
            })
        })
    }

     /**
     * 接收一个 Promise 数组，返回一个新的 Promise
     * 等待所有 Promise 完成（无论成功或失败）
     * 返回一个数组，包含每个 Promise 的结果状态和值
     */
     static allSettled(promises) {
        return new mPromise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                reject(new TypeError('promises must be an array'));
                return;
            }

            const results = [];
            let count = 0;

            // 处理空数组的情况
            if (promises.length === 0) {
                resolve(results);
                return;
            }

            promises.forEach((promise, index) => {
                mPromise.resolve(promise).then(
                    value => {
                        results[index] = {
                            status: 'fulfilled',
                            value
                        };
                        count++;
                        if (count === promises.length) {
                            resolve(results);
                        }
                    },
                    reason => {
                        results[index] = {
                            status: 'rejected',
                            reason
                        };
                        count++;
                        if (count === promises.length) {
                            resolve(results);
                        }
                    }
                )
            })
        });
    }

    /**
     * catch 方法用于处理 Promise 的错误情况
     * 实际上是 then(undefined, onRejected) 的语法糖
     * @param {Function} onRejected 错误处理函数
     * @returns {Promise} 返回一个新的 Promise
     */
    catch(onRejected) {
        return this.then(undefined, onReje---cted);
    }
    /**
     * finally 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作
     * 回调函数不接受任何参数，无法知道 Promise 的状态是成功还是失败
     * @param {Function} callback 最终要执行的回调函数
     * @returns {Promise} 返回一个新的 Promise
     */
    finally(callback) {
        return this.then(
            // 成功时执行回调，并将值传递下去
            value => mPromise.resolve(callback()).then(() => value),
            // 失败时执行回调，并继续抛出错误
            reason => mPromise.resolve(callback()).then(() => { throw reason; })
        );
    }
}
