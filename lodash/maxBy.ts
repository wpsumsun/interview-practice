type IterateeFunction<T> = (item: T) => number | string | Date;

function maxBy<T>(array: T[], iteratee: IterateeFunction<T> | keyof T): T | undefined {
    if (!array.length) return undefined;
    
    // 处理 iteratee 是字符串键名的情况
    const iterator = typeof iteratee === 'function' 
        ? iteratee 
        : (item: T) => item[iteratee];
    
    return array.reduce((max, item) => {
        return iterator(item) > iterator(max) ? item : max;
    }, array[0]);
} 