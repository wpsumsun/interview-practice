/**
 * 题目描述
公司用一个字符串来表示员工的出勤信息
。absent:缺勤
。late:迟到
。leaveearly:早退
present:正常上班
现需根据员工出勤信息，判断本次是否能获得出勤奖，能获得出勤奖的条件如下:
缺勤不超过一次，.
·没有连续的迟到/早退，
任意连续7次考勤，缺勤/迟到/早退不超过3次。
输入描述
用户的考勤数据字符串
记录条数 >=1;
·输入字符串长度<10000;
·不存在非法输入;
 */

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// 检查考勤记录是否符合获得考勤奖的条件
function check(records) {
    let absent = 0; // 记录缺勤次数
    
    // 遍历考勤记录
    for (let i = 0; i < records.length; i++) {
        // 如果当前记录是缺勤
        if (records[i] === "absent") {
            absent++; // 缺勤次数增加
            // 如果缺勤超过一次，则不满足条件
            if (absent > 1) {
                return false;
            }
        }
        // 如果当前记录是迟到或早退
        else if (records[i] === "late" || records[i] === "leaveearly") {
            // 如果前一条记录也是迟到或早退，则不满足条件
            if (i > 0 && (records[i-1] === "late" || records[i-1] === "leaveearly")) {
                return false;
            }
        }
        
        // 检查任意连续7次考勤
        if (i >= 6) {
            let count = 0; // 记录连续7次考勤中非正常上班的次数
            // 遍历连续的7次记录
            for (let j = i-6; j <= i; j++) {
                // 如果记录不是正常上班，则计数增加
                if (records[j] !== "present") {
                    count++;
                }
            }
            // 如果非正常上班的次数超过3次，则不满足条件
            if (count > 3) {
                return false;
            }
        }
    }
    
    // 如果所有条件都满足，则返回true
    return true;
}

let lineCount = 0;
let n = 0;

readline.on('line', (line) => {
    if (lineCount === 0) {
        n = parseInt(line);
    } else {
        const records = line.split(' ');
        console.log(check(records) ? "true" : "false");
        if (lineCount === n) {
            readline.close();
        }
    }
    lineCount++;
});