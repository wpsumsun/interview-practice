/**
 * 题目描述
 * 孙悟空爱吃蟠桃，有一天趁着蟠桃园守卫不在来偷吃。已知蟠桃园有 N 棵桃树，每颗树上都有桃子，守卫将在 H 小时后回来。
 * 孙悟空可以决定他吃蟠桃的速度K(个/小时)，每个小时选一颗桃树，并从树上吃掉K个，如果树上的桃子少于K个，则全部吃掉，并且这一小时剩余的时间里不再吃桃。
 * 孙悟空喜欢慢慢吃，但又想在守卫回来前吃完桃子。
 * 请返回孙悟空可以在 H 小时内吃掉所有桃子的最小速度K(K为整数)。如果以任何速度都吃不完所有桃子，则返回0。
 * 输入描述
 * 第一行输入为 N 个数字，N 表示桃树的数量，这 N 个数字表示每颗桃树上蟠桃的数量.
 * 第二行输入为一个数字，表示守卫离开的时间 H。
 * 其中数字通过空格分割，N、H为正整数，每颗树上都有蟠桃，且0<N<10000，0<H<10000。
 * 输出描述
 * 吃掉所有蟠桃的最小速度 K，无解或输入异常时输出 0。
 */

// 读取标准输入
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 判断以速度k是否能在h小时内吃完所有桃子
function canFinish(p, h, k) {
    let ans = 0;
    for (let x of p) {
        ans += Math.ceil(x / k);
    }
    return ans <= h;
}

// 处理输入
rl.on('line', (input) => {
    if (!this.peachcounts) {
        // 第一行输入，转换为桃子数量数组
        this.peachcounts = input.split(' ').map(Number);
        return;
    }
    // 第二行输入，转换为小时数
    const h = Number(input);
    rl.close(); // 不再读取输入

    // 输入验证
    const n = this.peachcounts.length;
    if (n === 0 || h <= 0 || n >= 10000 || h >= 10000 || n > h) {
        console.log(0);
        return;
    }

    // 二分查找最小吃桃速度
    let left = 1, right = 1e9;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (canFinish(this.peachcounts, h, mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    // 输出最小吃桃速度
    console.log(left);
});