/**
 * 题目描述
均衡串定义: 字符串只包含两种字符，且两种字符的个数相同。给定一个均衡字符串，请给出可分割成新的均衡子串的最大个数。约定字符串中只包含大写的X和Y两种字符
输入描述
均衡串: XXYYXY
字符串的长度[2,100001]。给定的字符串均为均衡串
输出描述
可分割为两个子串:
xxYY
XY
备注
分割后的子串，是原字符串的连续子串。
 */

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (s) => {
  // 初始化变量，用于记录可分割成新的均衡子串的最大个数
  let ans = 0;
  // 初始化变量，用于记录当前位置字符'X'和'Y'的差值
  let count = 0;
  
  // 遍历字符串的每个字符
  for (let i = 0; i < s.length; i++) {
    // 判断当前字符是'X'还是'Y'
    if (s.charAt(i) === 'X') {
      // 如果是'X'，则将count加1
      count++;
    } else {
      // 如果是'Y'，则将count减1
      count--;
    }
    
    // 在每次更新count后，判断count是否为0
    if (count === 0) {
      // 如果为0，表示当前位置可以作为分割点，将ans加1
      ans++;
    }
  }
  
  // 输出可分割成新的均衡子串的最大个数
  console.log(ans);
  rl.close();
});