/**
 * 题目描述
寿司店周年庆，正在举办优惠活动回馈新老客户，
寿司转盘上总共有 n盘寿司，prices[i] 是第i盘寿司的价格
如果客户选择了第ì盘寿司，寿词店免费赠送客户距离第i盘寿司最近的下一盘寿词j，前提是 prices]<pricesl，如果没有满足条件的j,则不赠送寿司。
每个价格的寿司都可无限供应。
输入描述
输入的每一个数字代表每盘寿司的价格，每盘寿司的价格之间使用空格分隔，例如:
3 15 6 14
表示:
第0盘寿司价格 prices[0]为 3。
。第1盘寿司价格 prices[1]为 15
。第2盘寿司价格 prices[2]为 6
。第3盘寿司价格 prices[3]为 14
。寿司的盘数n范围为:1≤n≤500
每盘寿司的价格 price 范围为:1≤price≤1000
输出描述
输出享受优惠后的一组数据，每个值表示客户选择第i盘寿司时实际得到的寿司的总价格。使用空格进行分隔，例如:
3 15 6  14
表示:
。第0盘寿司价格 prices[0] 为 3
·第1盘寿司价格 prices[1]为 15
·第2盘寿司价格 prices[2]为 6
·第3盘寿司价格 prices[3]为 14
。寿司的盘数n范围为:1≤ns500
每盘寿司的价格 price 范围为:1≤price≤1000
输出描述
输出享受优惠后的一组数据，每个值表示客户选择第i盘寿司时实际得到的寿司的总价格。使用空格进行分隔，例如:
3 21 9 17
 */

const readline = require('readline');

// 创建readline接口实例
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 从控制台读取一行输入
rl.on('line', (line) => {
    // 将输入的字符串按空格分割并转换成整数数组
    const prices = line.split(' ').map(Number);
    // 获取寿司价格数组的长度，代表寿司盘数
    const n = prices.length;
    // 创建一个数组来存储结果，即每个寿司盘享受优惠后的总价格
    const res = new Array(n).fill(0);
    // 创建一个栈来跟踪寿司价格的索引
    const stack = [];

    // 遍历每个寿司盘的价格，由于寿司盘是循环的，需要遍历两倍长度减一次
    for (let j = 0; j < n * 2 - 1; j++) {
        // 计算当前索引，由于数组是循环的，使用模运算得到实际索引
        const index = j % n;

        // 当栈不为空且栈顶元素的价格大于当前索引对应的价格时
        while (stack.length > 0 && prices[stack[stack.length - 1]] > prices[index]) {
            // 弹出栈顶元素的索引
            const topIndex = stack.pop();
            // 计算栈顶元素享受优惠后的价格，并更新结果数组
            res[topIndex] = prices[topIndex] + prices[index];
        }

        // 第一轮遍历时，将索引压入栈中
        if (j < n) {
            stack.push(index);
        }
    }

    // 遍历完成后，栈中剩余的元素代表它们右侧没有更小的价格
    // 直接将它们自身的价格作为结果
    while (stack.length > 0) {
        const topIndex = stack.pop();
        res[topIndex] = prices[topIndex];
    }

    // 输出结果，每个价格后加上空格
    console.log(res.join(' '));

    // 关闭readline接口
    rl.close();
});