/**
 * 给定一个数组，数组中的每个元素代表该位置的海拔高度。0表示平地，>=1时表示属于某个山峰，山峰的定义为当某个位置的左右海拔均小于自己的海拔时，该位置为山峰。数组起始位置计算时可只满足一边的条件。
输入描述
一个整数数组
输出描述
输出符合条件的山峰的个数
示例1：
输入：
[0,1,2,3,2,4]
输出：
2
示例2：
输入：
 [3,0,3,4,1]
输出：
2
函数：
arduino 代码解读复制代码
 */

function count_peaks(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (i === 0 && arr[i] > arr[i + 1]) {
            count++;
        } else if (i === arr.length - 1 && arr[i] > arr[i - 1]) {
            count++;
        } else if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {
            count++;
        }
    }
    return count;
}

console.log(count_peaks([0, 1, 2, 3, 2, 4]));
console.log(count_peaks([3, 0, 3, 4, 1]));
