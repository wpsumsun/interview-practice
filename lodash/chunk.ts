function chunk<T>(array: T[], size: number = 1): T[][] {
    // 处理边界情况
    if (size < 1) return [];
    if (array.length <= size) return [array];
    
    const result: T[][] = [];
    
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    
    return result;
}