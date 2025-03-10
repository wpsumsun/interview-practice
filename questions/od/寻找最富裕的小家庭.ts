/**
 * 题目描述
在一棵树中，每个节点代表一个家庭成员，节点的数字表示其个人的财富值一个节点及其直接相连的子节点被定义为一个小家庭。
现给你一棵树，请计算出最富裕的小家庭的财富和。
输入描述
第一行为一个数N，表示成员总数，成员编号1-N,1<=N<=1000
第二行为N个空格分隔的数，表示编号1-N的成员的财富值。0<=财富值<=100000接下来N-1行，每行两个空格分隔的整数(N1N2)，表示N1是N2的父节点。
输出描述
最富裕的小家庭的财富和
用例
输入
4
100 200 300 500
1 2
1 3
2 4
输出
700
说明
成员1，2，3组成的小家庭财富值为600成员2，4组成的小家庭财富值为700
 */

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];

readline.on('line', (line) => {
    input.push(line);
}).on('close', () => {
    const N = parseInt(input[0]); // 成员总数
    const wealth = input[1].split(' ').map(Number); // 存储每个成员的财富值
    wealth.unshift(0); // 为了使数组下标从1开始
    
    const familyWealth = [...wealth]; // 存储每个小家庭的财富和
    let maxWealth = wealth[1]; // 存储最大的财富和
    
    for (let i = 2; i < N + 1; i++) {
        const [N1, N2] = input[i].split(' ').map(Number); // 父子关系
        familyWealth[N1] += wealth[N2]; // 累加小家庭的财富和
        maxWealth = Math.max(maxWealth, familyWealth[N1]); // 更新最大的财富和
    }
    
    console.log(maxWealth); // 输出结果
});