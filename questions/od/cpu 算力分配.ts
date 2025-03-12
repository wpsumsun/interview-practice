/**
 * 现有两组服务器A和B，每组有多个算力不同的CPU，其中 AI是A组第i个CPU的运算能力，B 是 B组第i个CPU的运算能力,一组服务器的总算力是各CPU的算力之和。
为了让两组服务器的算力相等，允许从每组各选出一个CPU进行一次交换求两组服务器中，用于交换的CPU的算力，并且要求从A组服务器中选出的CPU，算力尽可能小。
输入描述
第一行输入为L1和L2，以空格分隔，L1表示A组服务器中的CPU数量，L2表示B组服务器中的CPU数量。第二行输入为A组服务器中各个CPU的算力值，以空格分隔,第三行输入为B组服务器中各个CPU的算力值，以空格分隔，
1 ≤L1≤ 10000
1 ≤L2≤ 10000
1 ≤A[] ≤ 100000
1 ≤ B[] ≤ 100000
输出描述
对于每组测试数据，输出两个整数，以空格分隔，依次表示A组选出的CPU算力，B组选出的CPU算力。要求从A组选出的CPU的算力尽可能小，
备注
保证两组服务器的初始总算力不同，
蔡案肯定存在
输入
2 2
1 2
2 3
输出
1 2
 */

function solve(L1: number, L2: number, A: number[], B: number[]): [number, number] {
    // 计算初始总算力
    const sumA = A.reduce((a, b) => a + b, 0);
    const sumB = B.reduce((a, b) => a + b, 0);
    
    // 计算需要的差值
    const diff = (sumB - sumA) / 2;
    
    // 遍历A组的每个CPU
    for (let i = 0; i < L1; i++) {
        const x = A[i];
        // 在B组中寻找合适的CPU
        for (let j = 0; j < L2; j++) {
            const y = B[j];
            // 如果找到满足条件的一对CPU
            if (y - x === diff) {
                return [x, y];
            }
        }
    }
    
    // 题目保证有解，所以不会执行到这里
    return [-1, -1];
}

// 测试用例
function test() {
    const L1 = 2, L2 = 2;
    const A = [1, 2];
    const B = [2, 3];
    const result = solve(L1, L2, A, B);
    console.log(result.join(' ')); // 输出: "1 2"
}