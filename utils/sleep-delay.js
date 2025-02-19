function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function delay(func, seconds, ...args) {
    await sleep(seconds);
    const result = await func(...args);
    return result;
}


function delay(fn, ms, ...args) {
    return new Promise(resolve => setTimeout(() => resolve(fn(...args)), ms));
}

// 测试 sleep 函数
async function testSleep() {
    console.log('测试 sleep 函数:');
    const start = Date.now();
    await sleep(1000);
    const end = Date.now();
    const duration = end - start;
    console.log(`sleep 持续时间: ${duration}ms`);
    console.assert(duration >= 1000, 'sleep 时间应该至少为 1000ms');
}

// 测试 delay 函数
async function testDelay() {
    console.log('\n测试 delay 函数:');
    const mockFunction = (...args) => args.reduce((a, b) => a + b, 0);
    
    const start = Date.now();
    const result = await delay(mockFunction, 1000, 1, 2, 3);
    const end = Date.now();
    
    console.log(`delay 执行结果: ${result}`);
    console.log(`delay 持续时间: ${end - start}ms`);
    console.assert(result === 6, 'delay 函数返回值应该为 6');
    console.assert(end - start >= 1000, 'delay 延迟时间应该至少为 1000ms');
}

// 运行所有测试
async function runTests() {
    await testSleep();
    await testDelay();
    console.log('\n所有测试完成');
}

runTests();