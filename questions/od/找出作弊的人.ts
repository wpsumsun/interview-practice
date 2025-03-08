/**
 * 题目描述
公司组织了一次考试,现在考试结果出来了，想看一下有没人存在作弊行为,但是员工太多了,需要先对员工进行一次过滤,再进一步确定是否存在作弊行为。
过滤的规则为:找到分差最小的员工ID对(p1,p2)列表,要求p1<p2
员工个数取值范国:O<n<100000
员工ID为整数,取值范围:0<=n<=100000
考试成绩为整数,取值范围:0<=score<=300
输入描述
员工的ID及考试分数
输出描述
分差最小的员工ID对(p1,p2)列表,要求p1<p2。每一行代表一个集合,每个集合内的员工!D按顺序排列,多行结果也以员工对中p1值大小升序排列(如果p1相同则p2升序)。
 */


const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let input = [];
rl.on('line', (line) => {
    input.push(line.trim());
}).on('close', () => {
    // 读取员工的数量
    const n = parseInt(input.shift());
    // 创建一个数组用于存储员工的ID和分数
    const employees = input.map(line => line.split(' ').map(Number));
    // 对员工数组按照分数进行排序
    employees.sort((a, b) => a[1] - b[1]);
    // 初始化最小分差为Number的最大值
    let minDiff = Number.MAX_SAFE_INTEGER;
    // 创建一个数组用于存储分差最小的员工ID对
    let result = [];
    // 遍历排序后的员工数组，计算相邻员工的分差
    for (let i = 1; i < n; i++) {
        const diff = employees[i][1] - employees[i - 1][1];
        // 如果当前分差小于最小分差，则更新最小分差，并清空结果数组，将当前员工ID对添加到结果数组中
        if (diff < minDiff) {
            minDiff = diff;
            result = [[employees[i - 1][0], employees[i][0]]];
        }
        // 如果当前分差等于最小分差，则将当前员工ID对添加到结果数组中
        else if (diff === minDiff) {
            result.push([employees[i - 1][0], employees[i][0]]);
        }
    }
    // 对结果数组按照员工ID进行排序
    result.sort((a, b) => a[0] - b[0]);
    // 打印出分差最小的员工ID对
    for (const pair of result) {
        console.log(pair.join(' '));
    }
});