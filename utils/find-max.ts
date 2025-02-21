function max<T>(list: T[]): T | null {
    if (!list.length) return null;
    return list.reduce((x, y) => (x > y ? x : y));
}

function maxTwo(list) {
    let max = -Infinity;
    let secondMax = -Infinity;
    for(let item of list) {
        if (item > max) {
            secondMax = max;
            max = item;
        } else if (item > secondMax) {
            secondMax = item;
        }
    }
    return [max, secondMax]
}

// 保留重复值的版本
function findTopNWithDuplicates(arr: number[], n: number): number[] {
    if (n <= 0) return [];
    if (n >= arr.length) return [...arr].sort((a, b) => b - a);
    
    const heap = new MinHeap(n);
    
    for (const num of arr) {
        heap.push(num);
    }
    
    return heap.toSortedArray();
}

// 去重版本
function findTopNUnique(arr: number[], n: number): number[] {
    if (n <= 0) return [];
    
    // 使用 Set 去重
    const uniqueNumbers = [...new Set(arr)];
    if (n >= uniqueNumbers.length) return uniqueNumbers.sort((a, b) => b - a);
    
    return uniqueNumbers.sort((a, b) => b - a).slice(0, n);
}