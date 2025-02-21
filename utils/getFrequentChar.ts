function getFrequentChar(str: string): [string, number] | null {
    if (!str) return null;
    const counts = new Map<string, number>();
    for(let s of str) {
        counts.set(s, counts.get(s) ? counts.get(s) + 1 : 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 1);
}

function getFrequentChar2(str: string): [string, number] | null {
    if (!str) return null;
    
    const counts = new Map<string, number>();
    
    // 统计字符频率
    for (const char of str) {
        counts.set(char, (counts.get(char) || 0) + 1);
    }
    
    // 找出最高频率的字符
    let maxChar = '';
    let maxCount = 0;
    
    for (const [char, count] of counts) {
        if (count > maxCount) {
            maxChar = char;
            maxCount = count;
        }
    }
    
    return [maxChar, maxCount];
}