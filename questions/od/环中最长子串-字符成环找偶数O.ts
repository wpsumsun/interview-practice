/**
 * 题目描述
给你一个字符串s，字符串s首尾相连成一个环形 ，请你在环中找出'o'字符出现了偶数次最长子字符串的长度。
给你一个字符串s，字符串s首尾相连成一个环形 ，请你在环中找出'o'字符出现了偶数次最长子字符串的长度。
输入描述
输入是一串小写字母组成的字符串
备注
1<= s.length <= 5 x 10^5
s只包含小写英文字母
输出描述
输出是一个整数

 */

// 引入readline模块，用于读取用户输入
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// 询问用户输入字符串
readline.on('line', (input) => {
    // 获取字符串的长度
    const len = input.length;
    // 初始化'o'字符的计数器
    let num = 0;
    // 遍历字符串，统计'o'字符的数量
    for (let chr of input) {
        if (chr === 'o') {
            num += 1;
        }
    }
    // 如果'o'字符出现的次数是偶数，则输出字符串的长度
    if (num % 2 === 0) {
        console.log(len);
    } else {
        // 如果'o'字符出现的次数是奇数，则输出字符串长度减1
        console.log(len - 1);
    }
    readline.close();
});