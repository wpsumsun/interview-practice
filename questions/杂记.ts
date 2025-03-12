/**
 * 一个球从100米高度自由落下，每次落地后反跳回原高度的一半再落下，
 * 求它第十次反弹多高？求它在第十次落地时，共经过多少米？
 */
let height = 100;
let totalDistance = height;
let bounceHeight = height;
let times = 10;
for (let i = 0;i < times;i++) {
    bounceHeight = bounceHeight / 2;
    if (i > 0) {
        totalDistance += bounceHeight * 2;
    }
}
console.log(bounceHeight);
console.log(totalDistance);

/**
 * 将字符串顺序倒过来，如abcd ef!，返回!fedcba 
 */
function reverseString(str: string) {
    return str.split('').reverse().join('');
}

/**
 * 用js实现一个对象深拷贝方法
 */

function deepClone(obj: any, hash = new WeakMap()) {
    if (typeof obj !== 'object' || obj === null) return obj;
    if (hash.has(obj)) return hash.get(obj);
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    const clone = Array.isArray(obj) ? [] : {};
    hash.set(obj, clone);
    Object.keys(obj).forEach(key => {
        clone[key] = deepClone(obj[key], hash);
    });
    return clone;
}

/**
 * 两个最多包含两位小数的数字求和，要求结果输出为两位小数的数字
 */
function sum(a: number, b: number) {
    return (a + b).toFixed(2);
}

function sum2(a: number, b: number) {
    const [a1, a2] = a.toString().split('.');
    const [b1, b2] = b.toString().split('.');
    const aInt = parseInt(a1);
    const bInt = parseInt(b1);
    const aDec = parseInt(a2);
    const bDec = parseInt(b2);
    const result = (aInt + bInt) + (aDec + bDec) / 100;
    return result.toFixed(2);
}

function sum3(a: number, b: number) {
    return ((a*100 + b * 100)/100).toFixed(2);
}

function test(num1: number, num2: number): string {
    let r1, r2, m;
    try {
        // 获取第一个数的小数位数
        r1 = num1.toString().split(".")[1]?.length || 0;
    } catch(e) {
        r1 = 0;
    }
    
    try {
        // 获取第二个数的小数位数
        r2 = num2.toString().split(".")[1]?.length || 0;
    } catch(e) {
        r2 = 0;
    }
    
    // 取最大的小数位数
    m = Math.pow(10, Math.max(r1, r2));
    
    // 将小数转为整数计算后再除回去，避免浮点数精度问题
    return ((num1 * m + num2 * m) / m).toFixed(2);
}

// 测试代码
console.log(test(1.01, 2.02));  // 输出: "3.03"
console.log(test(0.1, 0.2));    // 输出: "0.30"
console.log(test(1.999, 1.001)); // 输出: "3.00"

/**
 * 将数组中的数字按照从小到大的顺序排列，请将函数rankNums补全返回数组？
 */
function rankNums(arr: number[]) {
    return arr.sort((a, b) => a - b);
}
/**
 * 判断一个字符串中出现次数最多的字符，并输出该字符出现次数？
 */
function maxChar(str: string) {
    const map = new Map();
    for (const char of str) {
        map.set(char, (map.get(char) || 0) + 1);
    }
    return map.get(str.split('').sort((a, b) => map.get(b) - map.get(a))[0]);
}
/**
 * 请给出一个闭包示例？
 */
function createCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    }
}
/**
 * 使用jquery实现在点击一个id为ButtonToClic的按钮时隐藏一个id为imageToHide图片？
 */
// $(document).ready(function() {
//     $('#ButtonToClick').click(function() {
//         $('#imageToHide').hide();
//     });
// });
/**
 * 1.根据输入的数字范围[start,end]和随机数个数'n 生成随机数10 2.生成的随机数存储到数组中，返回该数组3.返回的数组不能有相同元素注意:
1.不需要考虑'n"大于数字范围的情况
 */
function generateRandomNumbers(start: number, end: number, n: number) {
    const result: number[] = [];
    while (result.length < n) {
        const random = Math.floor(Math.random() * (end - start + 1)) + start;
        if (!result.includes(random)) {
            result.push(random);
        }
    }
    return result;
}
/**
 * 要求:将数组参数中的多维数组扩展为一维类组并返回该数组。注意:1.数组参数中仅包含数组类型和数字类型
 */

function flattenArray(arr: any[]) {
    return arr.reduce((result, item) => {
        return result.concat(Array.isArray(item) ? flattenArray(item) : item);
    }, [])
}
/**
 * 判断是不是素数
 * @param n 
 * @returns 
 */
function isPrimeOptimized(n) {
    // 先处理 2 和 3
    if (n <= 3) {
        return n > 1;
    }
    // 排除能被 2 或 3 整除的数
    if (n % 2 === 0 || n % 3 === 0) {
        return false;
    }
    
    // 只需要检查形如 6k±1 的数
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false;
        }
    }
    return true;
}
