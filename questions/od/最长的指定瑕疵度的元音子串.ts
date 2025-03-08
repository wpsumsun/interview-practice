/**
 * 题目描述
开头和结尾都是元音字母(aeiouAEIOU)的字符串为元音字符串，其中混杂的非元音字母数量为其瑕疵度。比如:
1.“a”、“aa”是元音字符串，其瑕疵度都为0
2.“aiur”不是元音字符串(结尾不是元音字符)
3.“abira”是元音字符串，其瑕疵度为2
给定一个字符串，请找出指定瑕疵度的最长元音字符子串，并输出其长度，如果找不到满足条件的元音字符子串，输出0.
子串:字符串中任意个连续的字符组成的子序列称为该字符串的子串。
输入描述
首行输入是一个整数，表示预期的瑕疵度faw，取值范围[0,65535]。
接下来一行是一个仅由字符a-z和A-Z组成的字符串，字符串长度(0,65535]。
输出描述
输出为一个整数，代表满足条件的元音字符子串的长度,
 */

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    const flaw = parseInt(line.trim());
    rl.on('line', (line) => {
        const s = line.trim();
        // 定义元音字母集合
        const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
        // 记录字符串中所有元音字母的下标
        const vowelIdxs = [];
        for (let i = 0; i < s.length; i++) {
            if (vowels.has(s.charAt(i))) {
                vowelIdxs.push(i);
            }
        }
        // 初始化双指针
        let left = 0, right = 0;
        // 记录所有满足瑕疵度的元音子串的长度
        const lengths = [];
        while (right < vowelIdxs.length) {
            // 计算当前子串的瑕疵度
            const lengthDiff = vowelIdxs[right] - vowelIdxs[left] - (right - left);
            if (lengthDiff > flaw) {
                // 如果瑕疵度超过了预期，左指针右移
                left++;
            } else {
                // 如果瑕疵度不超过预期，记录子串长度
                if (lengthDiff === flaw) {
                    lengths.push(vowelIdxs[right] - vowelIdxs[left] + 1);
                }
                // 右指针右移
                right++;
            }
        }
        // 如果没有满足瑕疵度的元音子串，输出 0
        if (lengths.length === 0) {
            console.log(0);
            return;
        }
        // 输出最长的元音子串的长度
        lengths.sort((a, b) => b - a);
        console.log(lengths[0]);
    });
});