/**
 * 
 * @param N 题目描述
现有N个任务需要处理，同一时间只能处理一个任务，处理每个任务所需要的时间固定为1。
每个任务都有最晚处理时间限制和积分值，在最晚处理时间点之前处理完成任务才可获得对应的积分奖励。
可用于处理任务的时间有限，请问在有限的时间内，可获得的最多积分。
输入描述
第一行为一个数 N，表示有 N 个任务
。1≤N≤100
第二行为一个数 T，表示可用于处理任务的时间
。1STS100
接下来 N 行，每行两个空格分隔的整数(SLA和V)，SLA表示任务的最晚处理时间，V表示任务对应的积分。
。1S SLAS 100
。0≤V≤100000
输出描述
可获得的最多积分
用例1
输入
4
3
1 2
1 3
1 4
1 5
输出
5
说明
虽然有3个单位的时间用于处理任务，可是所有任务在时刻1之后都无效所以在第1个时间单位内，选择处理有5个积分的任务。1-3时无任务处理。
 * @param T 
 * @param tasks 
 * @returns 
 */


function maxPoints(N, T, tasks) {
    // 按照积分从高到低排序
    tasks.sort((a, b) => b[1] - a[1]);

    // 初始化时间槽，false 表示未被占用
    const timeSlots = new Array(T + 1).fill(false);

    let totalPoints = 0;

    for (const task of tasks) {
        const [sla, v] = task;
        // 从 sla 开始向前查找可用的时间槽
        for (let t = Math.min(sla, T); t >= 1; t--) {
            if (!timeSlots[t]) {
                timeSlots[t] = true; // 占用该时间槽
                totalPoints += v; // 累加积分
                break;
            }
        }
    }

    return totalPoints;
}

// 输入
const N = 4;
const T = 3;
const tasks = [
    [1, 2],
    [2, 3],
    [3, 4],
    [3, 5]
];

// 计算最大积分
const result = maxPoints(N, T, tasks);

// 输出结果
console.log(result); // 输出: 12
