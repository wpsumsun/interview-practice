// Input: ‘aaaabbbccd’
// Output: ‘a4b3c2d1’，代表 a 连续出现四次，b连续出现三次，c连续出现两次，d连续出现一次
function encode(str: string): string | null {
    if (!str) return null;
    let result: string[] = [];
    let lastChar = '';
    let count = 0;
    for (let char of str) {
        if (char !== lastChar) {
            lastChar = char;
            count = 1;
            result.push(`${lastChar}${count}`);
        } else {
            count++;
            result.splice(result.length - 1, 1, `${lastChar}${count}`);
        }
    }
    return result.join('');
}
// 如果只出现一次，不编码数字，如 aaab -> a3b
function encodeIgnoreOnce(str: string): string | null {
    if (!str) return null;
    let result: string[] = [];
    let lastChar = '';
    let count = 0;
    for (let char of str) {
        if (char !== lastChar) {
            lastChar = char;
            count = 1;
            result.push(lastChar);
        } else {
            count++;
            result.splice(result.length - 1, 1, `${lastChar}${count}`);
        }
    }
    return result.join('');
}
// 如果只出现两次，不进行编码，如 aabbb -> aab3
function encodeIgnoreTwice(str: string): string | null {
    if (!str) return null;
    let result: string[] = [];
    let lastChar = '';
    let count = 0;
    for (let char of str) {
        if (char !== lastChar) {
            lastChar = char;
            count = 1;
            result.push(lastChar);
        } else {
            count++;
            result.splice(result.length - 1, 1, count > 2 ? `${lastChar}${count}` : `${lastChar}${lastChar}`);
        }
    }
    return result.join('');
}
// 如果进行解码，碰到数字如何处理？
function decode(str: string): string | null {
    if (!str) return null;
    let result = '';
    let lastChar = '';
    for(let char of str) {
        const count = parseInt(char);
        if (!isNaN(count)) {
            result+=(lastChar.repeat(count));
        } else {
            lastChar = char;
        }
    }
    return result;
}

