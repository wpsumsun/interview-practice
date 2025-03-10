/**
 * 题目描述
2020年题:
英雄联盟是一款十分火热的对战类游戏。每一场对战有10位玩家参与，分为两组，每组5人。每位玩家都有一个战斗力，代表着这位玩家的厉害程度。为了对战尽可能精彩，我们需要把玩家们分为实力尽量相等的两组。一组的实力可以表示为这一组5位玩家的战斗力和。现在，给你10位玩家的战斗力，请你把他们分为实力尽量相等的两组。请你输出这两组的实力差。
2023年题:
部门准备举办一场王者荣耀表演赛，有10名游戏爱好者参与，分5为两队，每队5人。每位参与者都有一个评分，代表着他的游戏水平。为了表演赛尽可能精彩，我们需要把10名参赛者分为实力尽量相近的两队。一队的实力可以表示为这一队5名队员的评分总和。现在给你10名参与者的游戏水平评分，请你根据上述要求分队最后输出这两组的实力差绝对值。例: 10名参赛者的评分分别为51834671092，分组为(135810)(24 679)，两组实力差最小，差值为1。有多种分法，但实力差的绝对值最小为1。
输入描述
10个整数，表示10名参与者的游戏水平评分。范围在[1,10000]之间
输出描述
1个整数，表示分组后两组实力差绝对值的最小值
 */

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let res = Number.MAX_SAFE_INTEGER;
let totalSum = 0;
let targetSum = 0;

// 深度优先搜索函数
function dfs(nums, idx, count, currentSum) {
    // 当我们为一个队伍选择了5名玩家时
    if (count === 5) {
        // 计算另一个队伍的总和
        let otherTeamSum = totalSum - currentSum;
        // 用较小的差值更新结果
        res = Math.min(res, Math.abs(currentSum - otherTeamSum));
        return;
    }
    // 如果我们已经考虑了所有玩家，停止递归
    if (idx === 10) return;

    // 为第一个队伍选择当前玩家
    dfs(nums, idx + 1, count + 1, currentSum + nums[idx]);
    // 不为第一个队伍选择当前玩家
    dfs(nums, idx + 1, count, currentSum);
}

rl.on('line', (input) => {
    let nums = input.split('').map(Number);
    for (let num of nums) {
        totalSum += num;
    }
    targetSum = totalSum / 2;
    dfs(nums, 0, 0, 0);
    console.log(res);
    rl.close();
});