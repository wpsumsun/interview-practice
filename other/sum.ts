import { PromisePool } from "../promise/promise-map";

/*
实现一个sum函数，接收一个arr，累加arr的项，只能使用add方法，该方法接收两个数，模拟异步请求后端返回一个相加后的值
*/
function add(a,b) {
    return Promise.resolve(a+b)
}

// 基础版本：使用二分法递归处理
async function sum(arr: number[]): Promise<number> {
    if (arr.length === 0) return 0;
    if (arr.length === 1) return arr[0];
    
    const mid = Math.floor(arr.length / 2);
    const beforeArr = arr.slice(0, mid);
    const afterArr = arr.slice(mid);
    
    // 并行处理两半
    const [beforeSum, afterSum] = await Promise.all([
        sum(beforeArr),
        sum(afterArr)
    ]);
    
    return add(beforeSum, afterSum);
}

async function sum2(arr: number[]): Promise<number> {
    if (arr.length === 0) return 0;
    if (arr.length === 1) return arr[0];

    // 将数组两两分组
    const pairs: number[][] = [];
    for(let i = 0; i < arr.length; i+=2) {
        if (i + 1 < arr.length) {
            pairs.push([arr[i], arr[i+1]]);
        } else {
            pairs.push([arr[i]]);
        }
    }

    // 并行处理所有加法操作
    const results = await Promise.all(
        pairs.map(pair => 
            pair.length === 1 ? pair[0] : add(pair[0], pair[1])
        )
    );

    // 递归处理结果，直到只剩一个数
    return results.length === 1 ? results[0] : sum2(results);
}

/*
变种：如果后端设置了并发限制，一次不能请求超过三个，怎么办？
*/

// 带并发限制版本：使用 PromisePool
async function sumWithConcurrency(arr: number[]): Promise<number> {
    if (arr.length === 0) return 0;
    if (arr.length === 1) return arr[0];

    // 将数组两两分组
    const pairs: number[][] = [];
    for (let i = 0; i < arr.length; i += 2) {
        if (i + 1 < arr.length) {
            pairs.push([arr[i], arr[i + 1]]);
        } else {
            pairs.push([arr[i]]);
        }
    }

    // 使用 PromisePool 处理加法操作
    const results = await PromisePool.map(pairs, 3, async (pair) => {
        if (pair.length === 1) return pair[0];
        return add(pair[0], pair[1]);
    });

    // 递归处理结果，直到只剩一个数
    return results.length === 1 ? results[0] : sumWithConcurrency(results);
}

// 测试代码
async function test() {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    console.log('基础版本结果：');
    const result1 = await sum(arr);
    console.log(result1); // 55
    
    console.log('并发限制版本结果：');
    const result2 = await sumWithConcurrency(arr);
    console.log(result2); // 55
}

test();
  