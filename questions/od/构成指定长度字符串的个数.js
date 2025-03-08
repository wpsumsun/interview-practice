/**
 * 题目描述：构成指定长度字符串的个数 (本题分值100)
给定 M（0 < M ≤ 30）个字符（a-z），从中取出任意字符（每个字符只能用一次）拼接成长度为 N（0 < N ≤ 5）的字符串，

要求相同的字符不能相邻，计算出给定的字符列表能拼接出多少种满足条件的字符串，

输入非法或者无法拼接出满足条件的字符串则返回0。

输入描述
给定的字符列表和结果字符串长度，中间使用空格(" ")拼接

输出描述
满足条件的字符串个数

用例1
输入

aab 2

输出

2

说明

只能构成ab,ba。

用例2
输入

abc 2

输出

6

说明

可以构成：ab ac ba bc ca cb 。
 */

//1 导入所需的模块
import * as readline from 'readline';
// 创建一个接口来读取用户的输入
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//! 递归生成满足条件的不同字符串
function generateDistinctStrings(str, length, current, set, used) {
    //! 当生成的字符串长度等于指定长度时，将其加入到集合中
    if (current.length === length) {
        set.add(current);
        return;
    }
    // 遍历字符串中的字符
    for (let i = 0; i < str.length; i++) {
        //! 判断字符是否已经被使用，或者当前字符与前一个字符相同
        if (used[i] || (current.length > 0 && current.charAt(current.length - 1) === str.charAt(i))) {
            continue; // 如果字符已被使用或与前一个字符相同，则跳过当前字符
        }
        used[i] = true; // 标记当前字符为已使用
        //! 递归调用生成下一个字符
        generateDistinctStrings(str, length, current + str.charAt(i), set, used);
        used[i] = false; // 取消标记当前字符的使用状态，以便下一次遍历
    }
}

//! 计算满足条件的不同字符串的数量
function countDistinctStrings(str, length) {
    //! 创建一个集合来存储不同的字符串
    const set = new Set();
    //! 创建一个数组来标记字符串中的字符是否已经被使用
    const used = new Array(str.length).fill(false);
    // 调用generateDistinctStrings方法生成满足条件的不同字符串
    generateDistinctStrings(str, length, "", set, used);
    //! 返回不同字符串的数量
    return set.size;
}

// 读取用户输入的字符串
rl.on('line', (input) => {
    // 将输入的字符串按空格分割为两部分，分别为字符串和长度
    const parts = input.split(" ");
    const str = parts[0]; // 获取输入的字符串
    const length = parseInt(parts[1]); // 将输入的长度部分转换为整数
    // 调用countDistinctStrings方法计算满足条件的不同字符串的数量
    const count = countDistinctStrings(str, length);
    // 输出计算结果
    console.log(count);
    rl.close();
});
