/**
 * 题目描述
在一个大型体育场内举办了一场大型活动，由于疫情防控的需要，要求每位观众的必须间隔至少一个空位才允许落座。
现在给出一排观众座位分布图，座位中存在已落座的观众，请计算出，在不移动现有观众座位的情况下，最多还能坐下多少名观众。
输入描述
一个数组，用来标识某一排座位中，每个座位是否已经坐人。0表示该座位没有坐人，1表示该座位已经坐人。
。1≤数组长度≤10000
输出描述
整数，在不移动现有观众座位的情况下，最多还能坐下多少名观众。
 */

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (seats) => {
    let maxAdditional = 0; // 最大额外观众数初始化为0
    seats = seats.split(''); // 将输入字符串转换为字符数组

    for (let i = 0; i < seats.length; i++) {
        // 遍历座位数组
        if (seats[i] === '0' && (i === 0 || seats[i - 1] === '0') && (i === seats.length - 1 || seats[i + 1] === '0')) {
            // 如果当前位置是空座且左侧或右侧也是空座，执行以下操作
            maxAdditional++; // 最大额外观众数加1
            seats[i] = '1'; // 将当前位置标记为已坐
            i++; // 跳过下一个位置，因为已经坐人
        }
    }
    console.log(maxAdditional); // 打印最大额外观众数
    rl.close();
});