// 获取指定数量的随机元素
function sampleSize<T>(array: T[], n: number = 1): T[] {
    if (!array.length) return [];
    
    n = Math.min(n, array.length);  // 确保 n 不超过数组长度
    const result = [...array];
    
    // 使用 Fisher-Yates 算法的变体
    for (let i = 0; i < n; i++) {
        const randomIndex = i + Math.floor(Math.random() * (result.length - i));
        [result[i], result[randomIndex]] = [result[randomIndex], result[i]];
    }
    
    return result.slice(0, n);
}