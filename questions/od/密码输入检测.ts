/**
 * 题目描述:密码输入检测(本题分值100)
给定用户密码输入流input，输入流中字符<表示退格，可以清除前一个输入的字符，请你编写程序，输出最终得到的密码字符，并判断密码是否满足如下的密码安全要求。
密码安全要求如下:
1.密码长度>=8;
2.密码至少需要包含1个大写字母;
3.密码至少需要包含1个小写字母,
4.密码至少需要包含1个数字,
5.密码至少需要包含1个字母和数字以外的非空白特殊字符
注意空串退格后仍然为空串，且用户输入的字符串不包含'字符和空白字符。
输入描述
用一行字符串表示输入的用户数据，输入的字符串中'<"字符标识退格，用户输入的字符串不包含空白字符，例如: ABc<c89%088<
输出描述
输出经过程序处理后，输出的实际密码字符串，并输出改密码字符串是否满足密码安全要求。两者间由"分隔，例如:ABc89%88,true
示例1输入
1ABC<c89%000<
输出
1ABc89%00,true
说明
解释:多余的C和0由于退格被去除,最终用户输入的密码为ABc89%00，且满足密码安全要求，输出true
 */
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.on('line', input => {
    let result = '';
    let isBig = false;
    let isSmall = false;
    let isNum = false;
    let isSpec = false;

    for (let c of input) {
        if (c === '<') {
            result = result.slice(0, -1);
        } else {
            result += c;
        }
    }

    for (let c of result) {
        if (/[0-9]/.test(c)) {
            isNum = true;
        } else if (/[a-z]/.test(c)) {
            isSmall = true;
        } else if (/[A-Z]/.test(c)) {
            isBig = true;
        } else {
            isSpec = true;
        }
    }

    let flagRes = result.length >= 8 && isNum && isSmall && isBig && isSpec;
    console.log(result + "," + flagRes);
    readline.close();
});