// 获取所有元素的标签名及其出现次数
function getAllElementsWithCount() {
    const result = [...document.querySelectorAll('*')]
    .map(element => element.tagName)
    .reduce((o, tag) => {
        o[tag] = (o[tag] || 0) + 1;
        return o;
    }, {});
    return result;
}
// 获取出现次数最多的元素
function getMostFrequentElement() {
    const elementCounts = getAllElementsWithCount();
    let maxCount = 0;
    let mostFrequentElement = '';
    
    for (const [element, count] of Object.entries(elementCounts)) {
        if (count > maxCount) {
            maxCount = count;
            mostFrequentElement = element;
        }
    }
    
    return {
        element: mostFrequentElement,
        count: maxCount
    };
}
// 找到当前页面出现次数前三多的 HTML 标签 多个标签出现次数同样多，则取多个标签
function getTopThreeElements() {
    const elementCounts = getAllElementsWithCount();
    const sortedElements = Object.entries(elementCounts)
        .sort((a, b) => b[1] - a[1]); // 按出现次数降序排序
    
    // 获取前三个元素，如果有相同次数的元素也包含
    const result = [];
    let currentCount = -1;
    let rank = 0;
    
    for (const [element, count] of sortedElements) {
        if (count !== currentCount) {
            rank++;
            if (rank > 3) break;
            currentCount = count;
        }
        result.push({
            element,
            count
        });
    }
    
    return result;
}
