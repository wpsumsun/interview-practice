/**
 * 题目描述
从前有个村庄，村民们喜欢在各种田地上插上小旗子，旗子上标识了各种不同的数字。某天集体村民决定将覆盖相同数字的最小矩阵形的土地分配给村里做出巨大贡献的村民，请问此次分配土地，做出贡献的村民种最大会分配多大面积?
输入描述
第一行输入 m 和 n,
·m 代表村子的土地的长
·n代表土地的宽
第二行开始输入地图上的具体标识
输出描述
此次分配土地，做出贡献的村民种最大会分配多大面积
备注
旗子上的数字为1~500，土地边长不超过500
未插旗子的土地用0标识
用例1
输入
3 3
1 0 1
0 0 0
0 1 0
输出
9
说明
子，矩阵需要覆盖的横坐标为0和2，纵坐标为0和2，所以面积土地上的旗子为1，其坐标分别为(0,0)，(2,1)以及(0,2)，为了覆盖所有旗为9，即(2-0+1)*(2-0+1)=9
 */
const readline = require('readline');
// 创建 readline 接口实例
const rl = readline.createInterface({
  input: process.stdin, // Node.js 标准输入
  output: process.stdout // Node.js 标准输出
});

// 存储输入的所有行
let lines = [];
// 初始化土地的长和宽
let m = 0, n = 0;
// 记录已读取的行数
let lineCount = 0;

// 监听 line 事件，每次输入后触发
rl.on('line', (line) => {
  if (lineCount === 0) {
    // 第一行读取土地的长和宽
    [m, n] = line.split(' ').map(Number);
  } else {
    // 从第二行开始读取土地上的标识，并存储到 lines 数组中
    lines.push(line.split(' ').map(Number));
    // 当读取的行数等于土地的长度时，处理土地数据
    if (lines.length === m) {
      processLand(lines); // 调用处理土地数据的函数
      rl.close(); // 关闭 readline 接口实例
    }
  }
  lineCount++; // 行数加1
});

// 处理土地数据的函数
function processLand(land) {
  // 存储每个数字的最小位置
  let minPos = {};
  // 存储每个数字的最大位置
  let maxPos = {};
  // 初始化最大面积为 0
  let maxArea = 0;
  
  // 遍历土地的每个位置
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let num = land[i][j];
      // 如果当前位置的数字不为 0
      if (num !== 0) {
        // 如果当前数字是第一次出现，则记录其位置为最小和最大位置
        if (!minPos[num]) {
          minPos[num] = [i, j];
          maxPos[num] = [i, j];
        } else {
          // 更新当前数字的最小和最大位置
          minPos[num] = [Math.min(minPos[num][0], i), Math.min(minPos[num][1], j)];
          maxPos[num] = [Math.max(maxPos[num][0], i), Math.max(maxPos[num][1], j)];
        }
      }
    }
  }
  
  // 遍历记录的每个数字的位置
  for (let num in minPos) {
    // 计算每个数字对应的矩形面积
    let area = (maxPos[num][0] - minPos[num][0] + 1) * (maxPos[num][1] - minPos[num][1] + 1);
    // 更新最大面积
    maxArea = Math.max(maxArea, area);
  }
  
  // 输出最大面积
  console.log(maxArea);
}