/**
 * 题目描述
在学校中，N个小朋友站成一队，第i个小朋友的身高为height[i]第i个小朋友可以看到的第一个比自己身高更高的小朋友,，那么j是i的好朋友(要求 >i).请重新生成一个列表，对应位置的输出是每个小朋友的好朋友位置，如果没有看到好朋友，请在该位置用0代替。小朋友人数范围是 [0,40000]。
输入描述
第一行输入N，N表示有N个小朋友
第二行输入N个小朋友的身高height[i]，都是整数
输出描述
输出N个小朋友的好朋友的位置
输入
2
100 95
输出
80
说明
第一个小朋友身高100，站在队尾位置，向队首看，没有比他身高高的小朋友，所以输出第一个值为0.
第二个小朋友站在队首，前面也没有比他身高高的小朋友，所以输出第二个值为0。
用例2
输入
8
123 124 125 121 119 122 126 123
输出
1 2 6 5 5 6 0 0 
说明
123的好朋友是1位置上的124
124的好朋友是2位置上的125125的好朋友是6位置上的126
以此类推

 */
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let n = 0;
let height = [];

rl.on('line', (input) => {
    if (!n) {
        n = parseInt(input.trim());
    } else {
        height = input.trim().split(' ').map(Number);
        let friendIndexes = new Array(n).fill(0);
        let stack = [0];

        for (let i = 1; i < n; i++) {
            while (stack.length && height[i] > height[stack[stack.length - 1]]) {
                friendIndexes[stack.pop()] = i;
            }
            stack.push(i);
        }

        let result = "";
        for (let i = 0; i < n; i++) {
            result += friendIndexes[i] + " ";
        }
        console.log(result.trim());
    }
});