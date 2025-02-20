function shuffle<T>(array: T[]): T[] {
    const result = [...array];
    let currentIndex = result.length;
    
    while (currentIndex > 0) {
        // 随机选择一个元素
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        
        // 交换当前元素和随机选择的元素
        [result[currentIndex], result[randomIndex]] = 
        [result[randomIndex], result[currentIndex]];
    }
    
    return result;
}
