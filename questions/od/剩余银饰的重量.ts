/**
 * 题目描述
有 N 块二手市场收集的银饰，每块银饰的重量都是正整数，收集到的银饰会被熔化用于打造新的饰品。 每一回合，从中选出三块 最重的 银饰，然后一起熔掉。假设银饰的重量分别为 x、y 和 z，且 x<= y<=。那么熔掉的可能结果如下!
·如果x==y==z，那么三块银饰都会被完全熔掉,
·如果x==y且y!=z，会剩余重量为z-y的银块无法被熔掉;
。如果x!=y且y==z，会剩余重量为y-x的银块无法被熔掉;
·如果x!=y且y!=z，会剩余重量为z-y与y-x差值的银块无法被熔掉
如果剩余两块，返回较大的重量(若两块重量相同，返回任意一块皆可);如果只剩下一块，返回该块的重量;如果没有剩下，就返回 8。
输入描述
输入数据为两行
第一行为银饰数组长度n，1≤n≤48
第二行为 n 块银饰的重量，重量的取值范围为[1，2000]，重量之间使用空格隔开
输出描述
如果剩余两块，返回较大的重量(若两块重量相同，返回任意一块皆可);如果只剩下一块，返回该块的重量;如果没有剩下，就返回 0。
 */

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = []; // 创建数组存储输入行

rl.on('line', (line) => {
    lines.push(line);
    
    if (lines.length === 2) {
        let silverPieces = lines[1].split(' ').map(Number);
        silverPieces.sort((a, b) => b - a);
        
        while (silverPieces.length >= 3) {
            let z = silverPieces.shift();
            let y = silverPieces.shift();
            let x = silverPieces.shift();
            
            if (x === y && y === z) {
                continue;
            } else {
                let remaining;
                if (x === y && y < z) {
                    remaining = z - y;
                } else if (x < y && y === z) {
                    remaining = y - x;
                } else {
                    remaining = Math.abs((z - y) - (y - x));
                }
                
                if (remaining !== 0) {
                    silverPieces.push(remaining);
                    silverPieces.sort((a, b) => b - a);
                }
            }
        }
        
        if (silverPieces.length === 0) {
            console.log(0);
        } else {
            console.log(silverPieces[0]);
        }
        
        rl.close();
    }
});