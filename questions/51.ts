/**
 * 将字符串：
"i?���love�??�the�?great�?�?wall�in��?beijing"
更改为:
"i love the Great Wall in Beijing"。
规律：
1.乱码只有两种特殊字符分别是?(英文)和�(中文); 
2.如果乱码的末尾是?则它的下一位字母肯定是大写。
Tips: 'a'.toUpperCase() => 'A'
 */
function cleanString(input: string): string {
    let result = '';
    let capitalizeNext = false;

    for (let i = 0; i < input.length; i++) {
        const char = input[i];

        if (char === '?' || char === '�') {
            // If the current character is a '?', set the flag to capitalize the next character
            if (char === '?') {
                capitalizeNext = true;
            }
            continue; // Skip the current character
        }

        // If the flag is set, capitalize the current character
        if (capitalizeNext) {
            result += char.toUpperCase();
            capitalizeNext = false; // Reset the flag
        } else {
            result += char;
        }
    }

    return result;
}

const input = "i?���love�??�the�?great�?�?wall�in��?beijing";
const output = cleanString(input);
console.log(output); // "i love the Great Wall in Beijing"

/**
 * 设计一个自由可灵活配置的时间调度器,有a,b,c,d...很多个需要被调度的方法(方法名称的命名可随意),
 * 调度有两种形式,一个是顺序调用(例如调度完a后才能调度b),一个是间隔某个时间进行循环调度。
 * 用一个统一的方法进行封装可以实现下列的例子:
 * 1. 5秒后调用a,3秒后调用b,7秒后调用c。那么在第15秒的时候开始重新从0秒循环,又变成5秒后调用a,3秒后调用b,7秒后调用c，这样循环;
 * 2. 每间隔6秒调用一次a,每间隔4秒调用一次b。
 */

function scheduleSequential(tasks: { action: () => void, delay: number }[]) {
    let totalDelay = 0;
    tasks.forEach(task => {
        totalDelay += task.delay;
        setTimeout(() => {
            task.action();
        }, totalDelay);
    });

    // Restart the sequence after the total delay
    setTimeout(() => scheduleSequential(tasks), totalDelay);
}

function scheduleInterval(action: () => void, interval: number) {
    setInterval(action, interval);
}

// Example usage:

// Sequential scheduling
scheduleSequential([
    { action: () => console.log('Task A executed'), delay: 5000 },
    { action: () => console.log('Task B executed'), delay: 3000 },
    { action: () => console.log('Task C executed'), delay: 7000 }
]);

// Interval scheduling
scheduleInterval(() => console.log('Interval Task A executed'), 6000);
scheduleInterval(() => console.log('Interval Task B executed'), 4000);