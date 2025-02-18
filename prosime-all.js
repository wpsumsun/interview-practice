function promiseAll(promiseList) {
    return new Promise((resolve, reject) => {
        const results = [];
        let completed = 0;
        
        if (promiseList.length === 0) {
            resolve(results);
            return;
        }

        promiseList.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => {
                    results[index] = value;
                    completed++;
                    
                    if (completed === promiseList.length) {
                        resolve(results);
                    }
                })
                .catch(reject);
        });
    });
}
// 测试用例
async function testPromiseAll() {
    console.log('测试 promiseAll 函数:');

    // 测试用例1: 空数组
    const test1 = await promiseAll([]);
    console.log('测试空数组:', test1);
    console.assert(Array.isArray(test1) && test1.length === 0, '空数组测试失败');

    // 测试用例2: 正常Promise数组
    const promises = [
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3)
    ];
    const test2 = await promiseAll(promises);
    console.log('测试正常Promise数组:', test2);
    console.assert(JSON.stringify(test2) === '[1,2,3]', '正常Promise数组测试失败');

    // 测试用例3: 混合值数组
    const mixedPromises = [
        Promise.resolve(1),
        2,
        Promise.resolve(3)
    ];
    const test3 = await promiseAll(mixedPromises);
    console.log('测试混合值数组:', test3);
    console.assert(JSON.stringify(test3) === '[1,2,3]', '混合值数组测试失败');

    // 测试用例4: 包含reject的Promise
    try {
        await promiseAll([
            Promise.resolve(1),
            Promise.reject('错误'),
            Promise.resolve(3)
        ]);
        console.assert(false, 'Promise reject测试失败');
    } catch (error) {
        console.log('测试reject情况:', error);
        console.assert(error === '错误', 'Promise reject测试失败');
    }

    console.log('所有测试完成');
}

// 运行测试
testPromiseAll();
