/**
 * 题目描述
机器人搬砖，一共有N堆砖存放在N个不同的仓库中，第i堆砖中有bricks[i]块砖头，要求在8小时内搬完。机器人每小时能搬砖的数量取决于有多少能量格，机器人一个小时中只能在一个仓库中搬砖，机器人的能量格每小时补充一次且能量格只在这一个小时有效，为使得机器人损耗最小化尽量减小每次补充的能量格数 为了保障在8小时内能完成搬砖任务，请计算每小时给机器人充能的最小能量格数。
1、无需考虑机器人补充能量格的耗时
2、无需考虑机器人搬砖的耗时;
3、机器人每小时补充能量格只在这一个小时中有效;
输入描述
第一行为一行数字，空格分隔
输出描述
机器人每小时最少需要充的能量格，若无法完成任务，输出-1
 */
function minEnergyBlocks(bricks, hours) {
    if (bricks.length > hours) { // 如果砖块堆数量大于可用小时数
        return -1; // 返回-1
    }
    
    let left = 1, right = Math.max(...bricks); // 初始化左右边界
    
    while (left < right) { // 二分查找
        let middle = Math.floor((left + right) / 2); // 取中间值
        let totalTime = 0; // 计算当前能量块数量下能够搬完所有砖的总时间
        
        for (let i = 0; i < bricks.length; i++) {
            totalTime += Math.ceil(bricks[i] / middle);
        }
        
        if (totalTime > hours) { // 如果当前能量块数量下搬完所有砖的总时间超过了限定时间，增加能量块数量
            left = middle + 1;
        } else { // 否则，减小能量块数量
            right = middle;
        }
    }
    
    // 检查最终确定的能量块数量是否能在规定时间内搬完所有砖
    let sum = 0;
    for (let i = 0; i < bricks.length; i++) {
        sum += Math.ceil(bricks[i] / left);
    }
    
    if (sum > hours) { // 如果总时间超过限定时间
        return -1; // 无法在规定时间内搬完所有砖
    }
    
    return left; // 返回最小能量块数量
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    const bricks = input.split(' ').map(Number); // 修正：用空格分隔输入
    console.log(minEnergyBlocks(bricks, 8)); // 调用函数并输出结果
    rl.close();
});