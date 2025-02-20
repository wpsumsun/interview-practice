function keyBy<T>(array: T[], iteratee: IterateeFunction<T> | keyof T): Record<string, T> {
    return array.reduce((result, item) => {
        const key = typeof iteratee === 'function'
            ? iteratee(item)
            : item[iteratee];
            
        result[key] = item;
        return result;
    }, {} as Record<string, T>);
}