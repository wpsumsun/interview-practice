/**
 * 题目描述
 * 现代计算机系统中通常存在多级的存储设备，针对海量 workioad 的优化的一种思路是将热点内存页优先放到快速存储层级，这就需要对内存页进行冷热标记。
 * 一种典型的方案是基干内存页的访问频次进行标记，如果统计窗口内访问次数大于等于设定阈值，则认为是热内存页，否则是冷内存页。
 * 对于统计窗口内跟踪到的访存序列和阈值，现在需要实现基于频次的冷热标记。内存页使用页框号作为标识。
 * 
 * 输入描述
 * 第一行输入为 N，表示访存序列的记录条数，0<N≤10000
 * 第二行为访存序列，空格分隔的 N个内存页框号
 * 第三行为阈值
 * 
 * 输出描述
 * 第一行输出标记为热内存的内存页个数，如果没有被标记的热内存页，则输出0。
 * 如果第一行>0，则接下来按照访问频次降序输出内存页框号，一行一个，频次一样的页框号，页框号小的排前面。
 */

// 引入 readline 模块用于读取命令行输入
const readline = require('readline');

// 创建 readline 接口实例
const rl = readline.createInterface({
    input: process.stdin,    // 标准输入流
    output: process.stdout   // 标准输出流
});

// 用于存储输入行的数组
let inputLines = [];

// 监听'line' 事件，每次输入后触发
rl.on('line', (line) => {
    // 将输入的每一行添加到 inputLines 数组
    inputLines.push(line);
    // 当输入行数达到3行时，关闭 readline 接口
    if (inputLines.length === 3) {
        rl.close();
    }
}).on('close', () => {
    // 解析输入的第一行为页面访问次数
    const pageAccessCount = parseInt(inputLines[0].trim(), 10);
    // 解析输入的第二行为页面访问序列，转换为数字数组
    const pageAccessSequence = inputLines[1].trim().split(' ').map(Number);
    // 解析输入的第三行为热门页面的阈值
    const hotThreshold = parseInt(inputLines[2].trim(), 10);

    // 使用 reduce 方法统计每个页面的访问频率
    const pageFrequency = pageAccessSequence.reduce((acc, page) => {
        acc[page] = (acc[page] || 0) + 1;  // 如果页面已存在则增加计数，否则初始化为 1
        return acc;
    }, {});

    // 根据阈值过滤出热门页面，并转换为数字数组
    const hotPages = Object.entries(pageFrequency)
        .filter(([page, freq]) => freq >= hotThreshold)
        .map(([page]) => parseInt(page, 10));

    // 输出热门页面的数量
    console.log(hotPages.length);

    // 如果存在热门页面
    if (hotPages.length > 0) {
        // 对热门页面进行排序，先按访问频率降序，频率相同则按页面号升序
        hotPages.sort((a, b) => {
            const freqDiff = pageFrequency[b] - pageFrequency[a];
            return freqDiff !== 0 ? freqDiff : a - b;
        });

        // 输出排序后的热门页面
        hotPages.forEach((page) => {
            console.log(page);
        });
    }
});
function bubbleSort(arr: number[]): number[] {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // 交换相邻元素
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}
