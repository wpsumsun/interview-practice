Array.prototype.reduce = function(callback, initialValue) {
    const arr = this;
    if(typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    const length = arr.length;
    let accumulator = initialValue;
    let startIndex = 0;

    if (arguments.length < 2) {
        // 空数组且没有初始值时抛出错误
        if (length === 0) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        // 使用数组第一个元素作为初始值
        accumulator = arr[0];
        startIndex = 1;
    }

     // 遍历数组
     for (let i = startIndex; i < len; i++) {
        // 调用回调函数，更新累加器
        accumulator = callback(accumulator, arr[i], i, arr);
    }

    return accumulator;
}