/**
 * 题目描述:整数对最小和(分值100)给定两个整数数组array1、array2，数组元素按升序排列。假设从array1、array2中分别取出一个元素可构成一对元素，现在需要取出k对元素并对取出的所有元素求和，计算和的最小值。
注意:
两对元素如果对应于array1、array2中的两个下标均相同，则视为同一对元素
输入描述
输入两行数组array1、array2，每行首个数字为数组大小size(0<size<= 100),
0< array1[i] <= 1000
0< array2[i]<= 1000
接下来一行为正整数k
0 <k<= array1.size()* array2.size()
输出描述
满足要求的最小和
 */
const readline = require('readline');

// 创建readline接口实例
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (array1Input) => {
    // 将输入的字符串按空格分割为数组，并将每个元素转换为数字，然后去除第一个元素
    const array1 = array1Input.split(' ').map(Number).slice(1);

    rl.on('line', (array2Input) => {
        // 将输入的字符串按空格分割为数组，并将每个元素转换为数字，然后去除第一个元素
        const array2 = array2Input.split(' ').map(Number).slice(1);

        rl.on('line', (kInput) => {
            // 将输入的字符串转换为整数
            const k = parseInt(kInput);

            // 创建一个空数组pairsSum
            const pairsSum = [];

            // 嵌套循环，将array1和array2中的元素两两相加，并将结果存储到pairsSum中
            for (const value1 of array1) {
                for (const value2 of array2) {
                    pairsSum.push(value1 + value2);
                }
            }

            // 对pairsSum中的元素进行排序
            pairsSum.sort((a, b) => a - b);

            // 取出pairsSum中前k个元素，并使用reduce方法计算它们的和
            const minSum = pairsSum.slice(0, k).reduce((sum, value) => sum + value, 0);

            // 输出最小和
            console.log(minSum);

            // 关闭readline接口，结束程序的执行
            rl.close();
        });
    });
});