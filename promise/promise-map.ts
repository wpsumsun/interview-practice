export class PromisePool {
    /**
     * Promise.map 实现，带并发限制
     * @param items 要处理的数组
     * @param concurrency 最大并发数
     * @param iteratorFn 对每个项进行处理的异步函数
     */
    static async map<T, R>(
        items: T[],
        concurrency: number,
        iteratorFn: (item: T, index: number) => Promise<R>
    ): Promise<R[]> {
        // 存储所有结果
        const results: R[] = new Array(items.length);
        // 当前正在处理的 promise 数量
        let running = 0;
        // 下一个要处理的索引
        let index = 0;
        
        return new Promise((resolve, reject) => {
            // 启动初始的 promises
            const runNext = async () => {
                // 当前要处理的索引
                const currentIndex = index++;
                
                // 如果所有项都已开始处理，则退出
                if (currentIndex >= items.length) {
                    // 如果没有正在运行的 promise，完成操作
                    if (running === 0) resolve(results);
                    return;
                }

                running++;
                try {
                    // 执行异步操作
                    const result = await iteratorFn(items[currentIndex], currentIndex);
                    results[currentIndex] = result;
                    
                    running--;
                    // 继续处理下一个
                    runNext();
                } catch (error) {
                    reject(error);
                }
            };

            // 启动初始的并发任务
            for (let i = 0; i < Math.min(concurrency, items.length); i++) {
                runNext();
            }
        });
    }
}

// 使用示例
async function example() {
    // 模拟异步操作
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    
    // 测试数据
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    // 异步处理函数
    const processItem = async (item: number, index: number) => {
        console.log(`开始处理 ${item}`);
        await delay(1000); // 模拟耗时操作
        console.log(`完成处理 ${item}`);
        return item * 2;
    };

    try {
        // 使用 Promise.map，限制并发数为 3
        const results = await PromisePool.map(items, 3, processItem);
        console.log('所有任务完成:', results);
    } catch (error) {
        console.error('处理出错:', error);
    }
}

// 运行示例
example();