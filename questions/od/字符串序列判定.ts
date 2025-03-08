/**
 * 题目描述
输入两个字符串 S 和 L，都只包含英文小写字母。S 长度<=100，L 长度<=500,000。
判定 S 是否是 L 的有效子串。

判定规则：
S 中的每个字符在 L 中都能找到（可以不连续），且 S 在Ｌ中字符的前后顺序与 S 中顺序要保持一致。

（例如，S=”ace”是 L=”abcde”的一个子序列且有效字符是 a、c、e，而”aec”不是有效子序列，且有效字符只有 a、e）

输入描述
输入两个字符串 S 和 L，都只包含英文小写字母。S 长度<=100，L 长度<=500,000。
先输入 S，再输入 L，每个字符串占一行。

输出描述
S 串最后一个有效字符在 L 中的位置。（首位从 0 开始计算，无有
 */

 const readline = require('readline');

 const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
 });

 rl.on('line', (stringS) => {
    rl.on('line', (stringL) => {
        let indexS = 0;
        let indexL = 0;
        while (indexS < stringS.length && indexL < stringL.length) {
            if (stringS[indexS] === stringL[indexL]) {
                indexS++;
            }
            indexL++;
        }
        if (indexS === stringS.length) {
            console.log(indexL - 1);
        } else {
            console.log(-1);
        }
        rl.close();
    });
 });
 
