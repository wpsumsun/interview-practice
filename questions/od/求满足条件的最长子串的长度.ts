/**
 * 题目描述
给定一个字符串，只包含字母和数字，按要求找出字符串中的最长(连续)子串的长度，字符串本身是其最长的子串，子串要求:1、只包含1个字母(a~z,A~Z)，其余必须是数字;
2、 字母可以在子串中的任意位置;
如果找不到满足要求的子串，如全是字母或全是数字，则返回-1。
输入描述
字符串(只包含字母和数字)
输出描述
子串的长度
 */
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// 读取输入的字符串
readline.on('line', (str) => {
  // 初始化最长子串长度为-1
  let maxLen = -1;
  // 初始化一个标志，表示是否找到了包含字母的子串
  let hasLetter = false;
  // 初始化双指针l和r，分别表示子串的左右边界
  let l = 0, r = 0;
  // 创建一个数组用于存储字母的索引
  let letterIdx = [];
  
  // 遍历字符串
  while(r < str.length) {
    // 获取当前字符
    let c = str.charAt(r);
    // 如果当前字符是字母
    if(c.match(/[a-zA-Z]/)) {
      // 设置标志为true，表示找到了包含字母的子串
      hasLetter = true;
      // 将字母的索引添加到队列的尾部
      letterIdx.push(r);
      // 如果队列中有多于1个字母的索引
      if(letterIdx.length > 1) {
        // 移除队列头部的字母索引，并将左指针l移动到该索引的下一个位置
        l = letterIdx.shift() + 1;
      }
      // 如果右指针r等于左指针，跳过当前循环
      if(r === l) {
        r++;
        continue;
      }
    }
    // 更新最长子串长度
    maxLen = Math.max(maxLen, r - l + 1);
    // 移动右指针
    r++;
  }
  
  //如果没有找到包含字母的子串，输出-1
  if(!hasLetter) {
    console.log(-1);
  } else {
    // 否则输出最长子串长度
    console.log(maxLen);
  }
  readline.close();
});