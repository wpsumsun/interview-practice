function sum(...args: number[]) {
    const f = (...rest: number[]) => sum(...args, ...rest);
    f.valueOf = () => {
        return args.reduce((x, y) => {
            return x + y;
        }, 0)
    }
    return f;
}

function sum2(...args: number[]) {
    // 保存当前累加的结果
    let total = args.reduce((acc, cur) => acc + cur, 0);
    
    // 定义递归函数，支持链式调用
    function innerSum(...innerArgs: number[]) {
        total += innerArgs.reduce((acc, cur) => acc + cur, 0);
        return innerSum;
    }
    
    // 实现 valueOf 方法，在需要值的时候返回结果
    innerSum.valueOf = function() {
        return total;
    };
    
    return innerSum;
}

// 测试用例
console.log(sum(1, 2, 3).valueOf());             // 6
console.log(sum(2, 3)(2).valueOf());             // 7
console.log(sum(1)(2)(3)(4).valueOf());          // 10
console.log(sum(2)(4, 1)(2).valueOf());          // 9
console.log(sum(1)(2)(3)(4)(5)(6).valueOf());    // 21

// 不使用 valueOf 直接计算
// //=> 15
// sum(1, 2, 3) + sum(4, 5);
 
//=> 100
// sum(10) * sum(10);

function sum3(...args: number[]) {
    // 计算当前参数的总和
    const total = args.reduce((acc, cur) => acc + cur, 0);
    
    // 重写 toString 方法，使函数可以直接参与计算
    function innerSum(...innerArgs: number[]) {
        return total + innerArgs.reduce((acc, cur) => acc + cur, 0)
    }
    
    // 重写 toString 和 valueOf，使函数可以直接转换为数字
    innerSum.toString = () => total.toString();
    innerSum[Symbol.toPrimitive] = (hint: string) => total;
    
    return innerSum;
}