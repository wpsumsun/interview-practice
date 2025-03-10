/**
 * 题目描述
小明今年升学到了小学1年级来到新班级后，发现其他小朋友身高参差不齐然后就想基于各小朋友和自己的身高差，对他们进行排序，请帮他实现排序。
输入描述
友个数。第一行为正整数 h和n，0<h<200 为小明的身高，0<n<50 为新班级其他小朋第二行为n个正整数，h1~hn分别是其他小朋友的身高，取值范围0<hi<200且n个正整数各不相同。
输出描述
输出排序结果，各正整数以空格分割，
和小明身高差绝对值最小的小朋友排在前面
和小明身高差绝对值最大的小朋友排在后面
如果两个小朋友和小明身高差一样，则个子较小的小朋友排在前面。
用例
输入
100 10
95 96 97 98 99 101 102 103 104 105
输出
99 101 98 102 97 103 96 104 95 105
说明
按身高差排序后结果为:99 101 98 102 97 103 96小明身高100，班级学生10个，身高分别为95 96 97 98 99 101 102 10304 105，104 95 105。
 */

const readline = require("readline");
// 创建readline接口，用于读取输入
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let h, n;
let heights = [];

// 监听输入事件
rl.on('line', (input) => {
  // 如果h和n未赋值，表示当前输入为第一行，包含小明的身高和新班级其他小朋友的个数
  if (!h && !n) {
    const inputArr = input.split(' ');
    h = parseInt(inputArr[0]);
    n = parseInt(inputArr[1]);
  } else {
    // 否则，表示当前输入为第二行，包含其他小朋友的身高
    const heightArr = input.split(' ');
    // 将输入的身高字符串转换为整数并存储在heights数组中
    heights = heightArr.map(height => parseInt(height));
    
    // 对heights数组进行排序
    heights.sort((a, b) => {
      const diffA = Math.abs(a - h);
      const diffB = Math.abs(b - h);
      
      // 如果两个小朋友和小明身高差一样，则个子较小的小朋友排在前面
      if (diffA === diffB) {
        return a - b;
      }
      // 否则，根据与小明身高差的绝对值进行排序
      return diffA - diffB;
    });
    
    // 输出排序后的结果
    console.log(heights.join(' '));
    rl.close();
  }
});