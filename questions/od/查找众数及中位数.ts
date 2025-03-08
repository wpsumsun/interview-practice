/**
 * 题目描述:查找众数及中位数(本题分值100)
众数是指一组数据中出现次数量多的那个数，众数可以是多个。
中位数是指把一组数据从小到大排列，最中间的那个数，如果这组数据的个数是奇数，那最中间那个就是中位数，如果这组数据的个数为偶数，那就把中间的两个数之和除以2，所得的结果就是中位数。
查找整型数组中元素的众数并组成一个新的数组，求新数组的中位数。
输入描述
输入一个一维整型数组，数组大小取值范围 0<N<1000，数组中每个元素取值范围 0<E<1000
输出描述
输出众数组成的新数组的中位数
--------
输入
10 11 21 19 21 17 21 16 21 18 15
输出
21

 */

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    const numbers = input.split(" ").map(num => parseInt(num));
    const countMap = new Map<number, number>();
    let maxCount = 0;

    for (let number of numbers) {
        let count = countMap.get(number) || 0;
        count++;
        countMap.set(number, count);
        maxCount = Math.max(maxCount, count);
    }

    const maxCountNumbers = Array.from(countMap.entries())
        .filter(entry => entry[1] === maxCount)
        .map(entry => entry[0])
        .sort((a, b) => b - a);

    let median;
    if (maxCountNumbers.length % 2 !== 0) {
        let index = Math.floor(maxCountNumbers.length / 2);
        median = maxCountNumbers[index];
    } else {
        let index1 = maxCountNumbers.length / 2 - 1;
        let index2 = maxCountNumbers.length / 2;
        median = Math.floor((maxCountNumbers[index1] + maxCountNumbers[index2]) / 2);
    }

    console.log(median);
    rl.close();
});