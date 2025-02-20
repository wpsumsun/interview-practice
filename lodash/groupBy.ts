function groupBy<T>(array: T[], iteratee: IterateeFunction<T> | keyof T): Record<string, T[]> {
    return array.reduce((result, item) => {
        const key = typeof iteratee === 'function'
            ? iteratee(item)
            : String(item[iteratee]);
            
        (result[key] = result[key] || []).push(item);
        return result;
    }, {} as Record<string, T[]>);
}