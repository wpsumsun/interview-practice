function debounce<T extends (...args: any[]) => any>(fn: T, wait: number = 300) {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return function(...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, wait)
    }
}

function throttle1<T extends (...args: any[]) => any>(fn: T, wait: number = 300) {
    let pre = 0;
    return function(...args) {
        const now = Date.now();
        if (now - pre >= wait) {
            pre = now;
            fn.apply(this, args);
        }
    }
}

Function.prototype.call = function(context: any, ...args: any[]) {
    if (typeof this !== 'function') {
        throw new TypeError('this must be a function');
    }
    const fn = Symbol('fn');
    context = context || window;
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result;
}

Function.prototype.apply = function(context: any, args: any[]) {
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

Function.prototype.bind = function(context: any, ...args: any[]) {
    if (typeof this !== 'function') {
        throw new TypeError('this must be a function');
    }
    const fn = this;
    return function(...newArgs) {
        this.apply(context, [...args, ...newArgs]);
    }
}

function sleep1(seconds): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, seconds)
    })
}

function delay1(fn, seconds, ...args) {
    return new Promise(resolve => {
        setTimeout(() => {
            const result = fn(...args);
            resolve(result);
        }, seconds)
    })
}

function proAll(promises) {
    return new Promise((resolve, reject) => {
        let count = 0;
        const results = [];
        if (promises.length === 0) {
            resolve(results);
            return;
        }
        promises.forEach((promise, index) => {
            Promise.resolve(promise)
            .then(res => {
                results[index] = res;
                count++;
                if (count === promises.length) {
                    resolve(results);
                }
            })
            .catch(err => {
                reject(err)
            })
        })
    })
}

Array.prototype.isArray = function() {
    return Object.prototype.toString.call(this) === '[object Array]';
}

Array.prototype.flat = function(depth) {
    let result = [];
    depth = depth || 1;
    let fn = (array, dep) => {
        if (dep < 1) return array;
        array.forEach(item => {
            if (Array.isArray(item)) {
                result.push(...fn(item, dep - 1));
            } else {
                result.push(item);
            }
        })
        return result;
    }
    return fn(this, depth);
}

const PENDING = 'pending';
const FUFILLED = 'fufilled';
const REJECTED = 'rejected';

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        reject(new TypeError('cycle'));
    }
    let called = false;
    if (x && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then();
            if (typeof then === 'function') {
                then.call(
                    x,
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

class myPromise {
    constructor(executor) {
        this.status = PENDING;
        this.value = '';
        this.reason = '';
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FUFILLED;
                this.value = value;
                this.onFulfilledCallbacks.forEach(fn => fn());
            }
        }
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error);
        }
    }

    then(onFufilled, onRejected) {
        onFufilled = typeof onFufilled === 'function' ? onFufilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => reason;

        const promise2 = new mPromise((resolve, reject) => {
            if (this.status === FUFILLED) {
                setTimeout(() => {
                    try {
                        const result = onFufilled(this.value);
                        resolvePromise(promise2, result, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                })
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        const result = onRejected(this.reason);
                        resolvePromise(promise2, result, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                })
            }
            if (this.status === PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                      const x = onFufilled(this.value);  
                      resolvePromise(promise2, x, resolve, reject);
                    })
                })
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                      const x = onRejected(this.reason);  
                      resolvePromise(promise2, x, resolve, reject);
                    })
                })
            }
        })

        return promise2;
    }
}

Array.prototype.reduce = function(callback, initialValue) {
    if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function')
    }

    const arr = this;
    const length = arr.length
    let accumulator = initialValue;
    let startIndex = 0;
    if (arguments.length < 2) {
        if (!length) {
            throw new Error('xx')
        }
        accumulator = arr[0];
        startIndex = 1;
    }
    for(let i = startIndex; i < arr.length; i++) {
        accumulator = callback(accumulator, arr[i], i, arr);
    }
    return accumulator;
}

String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '')
}

function cloneDeep(obj, hash = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') return obj;

    if (hash.has(obj)) return hash.get(obj);

    if (obj instanceof Date) {
        return new Date(obj);
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }
    const clone = Array.isArray(obj) ? [] : {};
    hash.set(obj, clone);
    Object.keys(obj).forEach(key => {
        clone[key] = cloneDeep(obj[key], hash);
    })
    
    return clone;
}

function isEqual(x, y) {
    if (x === y) return true;
    if (x === undefined || y === undefined || x === null || y === null) {
        return x === y;
    }
    const xValueType = Object.prototype.toString.call(x);
    const yValueType = Object.prototype.toString.call(y);
    if (xValueType !== yValueType) return false;
    if (x instanceof Date) {
        return x.getTime() === y.getTime();
    }
    if (x instanceof RegExp) {
        return x.toString() === y.toString();
    }
    if (typeof x === 'object') {
        const xKeys = Object.keys(x);
        const yKeys = Object.keys(y);
        if (xKeys.length !== yKeys.length) {
            return false;
        }
        return xKeys.every(key => {
            return yKeys.includes(key) && isEqual(x[key], y[key]);
        })
    }
    return false;
}

function compose(...fns) {
    if (!fns.length) {
        return args => args;
    }
    if (fns.length === 1) return fns[0];
    return fns.reduce((a, b) => {
        return (...args) => {
            return a(b(...args))
        }
    })
    return fns.reduce((a, b) => (...args) => a(b(...args)));
}

function shuffle(array) {
    if (!array || !array.length) return [];
    const list = [...array];
    let currentIndex = list.length - 1;
    while(currentIndex > 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        [list[currentIndex], list[randomIndex]] = [list[randomIndex], list[currentIndex]];
        currentIndex--;
    }
}

function random() {
    return Math.random().toString().slice(2, 8);
}

function uniqueCode(n) {
    const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = [];
    for(let i = 0; i < n; i++) {
        const randomIndex = Math.floor(Math.random() * list.length);
        result.push(list[randomIndex]);
        list.splice(randomIndex, 1);
    }
    return result.join('');
}

function maxBy(array, fn) {
    return array.reduce((acc, next) => {
        return fn(acc) > fn(next) ? acc : next;   
    })
}

function keyBy(list, iteratee) {
    if (!list.length) return undefined;
    iteratee = typeof iteratee === 'function' ? iteratee : (item) => item[iteratee];
    return list.reduce((acc, item) => {
        acc[iteratee(item)] = item;
        return acc;
    }, {})
}

function groupBy(list, iteratee) {
    if (!list.length) return undefined;
    iteratee = typeof iteratee === 'function' ? iteratee : (item) => item[iteratee];
    return list.reduce((result, item) => {
        result[iteratee(item)] = result[iteratee(item)] || [];
        result[iteratee(item)].push(item);
        return result;
    }, {})
}

function chunk(list, size) {
    const result = [];
    for(let i = 0; i < list.length; i++) {
        const index = Math.floor(i/size);
        result[index] = result[index] || [];
        result[index].push(list[i])
    }
    return result;
}

/*
  请实现一个 sum 函数，接收一个数组 arr 进行累加，并且只能使用add异步方法
  
  add 函数已实现，模拟异步请求后端返回一个相加后的值
*/
function add(a, b) {
    return Promise.resolve(a + b);
}

async function sum(arr) {
    if (arr.length === 0) return 0;
    if (arr.length === 1) return arr[0]
    const midIndex = Math.floor(arr.length/2);
    const beforeArr = arr.slice(0, midIndex);
    const afterArr = arr.slice(midIndex)
    const [beforeSum, afterSum] = await Promise.all([sum(beforeArr), sum(afterArr)]);
    return add(beforeSum, afterSum);
}

const template = '{{ user["name"] }}，今天你又学习了吗 - 用户ID: {{ user.id }}';
 
const data = {
  user: {
    id: 10086,
    name: '山月',
  }
};
 
//=> "山月，今天你又学习了吗 - 用户ID: 10086"
function render(template, data) {
    return template.replace(/\{\{\s*(.*?)\s*\}\}/g, (match, expression) => {
        console.log('expression', expression);
        const value = expression.replace(/\["?(\w*)"?\]/g, '.$1').split('.').filter(Boolean).reduce((obj, key) => {
            console.log('key', key, obj ? obj[key] : undefined);
            return obj ? obj[key] : undefined;
        }, data)
        return value !== undefined ? String(value) : match;
    })
};

function pickBy(obj, iteratee) {
    if (!obj) return null;
    return Object.keys(obj).reduce((result, key)=> {
        if (iteratee(obj[key])) {
            result[key] = obj[key];
        }
        return result;
    }, {})
}

function camelCase(str) {
    return str.split(/[\s-_.]+/g).filter(Boolean).reduce((result, word, index) => {
        const temp = word.toLowerCase()
        result += (index > 0 ? temp.charAt(0).toUpperCase() + temp.slice(1) : temp)
        return result;
    }, '')
}

function intersection(arrays) {
    if (!arrays?.length) return [];
    if (arrays.length === 1) return arrays[0];
    
    const firstArray = arrays[0];
    const otherArrays = arrays.slice(1);

    return firstArray.filter(v => {
        return otherArrays.every(array => array.includes(v));
    })
}

function promiseMap(list, iteratorFn, concurrency) {
    let results = [];
    let running = 0;
    let index = 0;

    return new Promise((resolve, reject) => {
        concurrency = Math.min(concurrency, list.length);

        const runNext = async () => {
            const currentIndex = index++;
            
            
            if (currentIndex >= list.length) {
                if (running === 0) {
                    resolve(results);
                }
                return;
            }

            running++;

            try {
                const res = await iteratorFn(list[currentIndex]);
                results[currentIndex] = res;
                running--;
                runNext();
            } catch (error) {
                reject(error);
            }
        }

        for(let i=0;i < concurrency;i++) {
            runNext();
        }
    })
} 

function encode(stt) {
    let result = '';
    let lastChar = '';
    let count = 0;
   for(let i = 0; i < stt.length; i++) {
        const char = stt[i];
        if (char === lastChar) {
            count++;
        } else {
            count = 1;
        }
        lastChar = char;
        result += char + count;
   }
   return result;
}