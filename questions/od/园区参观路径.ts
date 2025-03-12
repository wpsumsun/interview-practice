const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const input = [];

rl.on('line', (line) => {
    input.push(line.split(' ').map(Number));
});

rl.on('close', function() {
    // 获取园区的长和宽
    let m = input[0][0];
    let n = input[0][1];
    
    // 创建一个二维数组来存储每个园区是否可以参观
    let grid = input.slice(1);
    
    // 创建一个二维数组来存储从起始园区到每个园区的路径数量
    let dp = Array.from({length: m}, () => Array(n).fill(0));
    
    // 使用两层for循环计算从起始园区到每个园区的路径数量
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // 如果当前园区可以参观（grid[i][j] == 0）
            if (grid[i][j] == 0) {
                if (i == 0 && j == 0) {
                    // 起点的路径数为1
                    dp[i][j] = 1;
                } else if (i == 0) {
                    // 第一行只能从左边来
                    dp[i][j] = dp[i][j - 1];
                } else if (j == 0) {
                    // 第一列只能从上边来
                    dp[i][j] = dp[i - 1][j];
                } else {
                    // 其他位置可以从上边或左边来
                    dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
                }
            }
            // 如果grid[i][j] == 1，dp[i][j]保持为0，表示此处不可通过
        }
    }
    
    // 输出从起始园区到终点园区的路径数量
    console.log(dp[m-1][n-1]);
});
