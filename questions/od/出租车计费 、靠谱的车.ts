/**
 * 题目描述:出租车计费 、靠谱的车程序员小明打了一辆出租车去上班。出于职业敏感，他注意到这辆出租车的计费表有点问题，总是偏大。出租车司机解释说他不喜欢数字4，所以改装了计费表，任何数字位置遇到数字4就直接跳过，其余功能都正常比如:
1.23再多一块钱就变为25;
2.39再多一块钱变为50:
3.399再多一块钱变为500，
小明识破了司机的伎俩，准备利用自己的学识打败司机的阴谋。
给出计费表的表面读数，返回实际产生的费用。
输入描述
只有一行，数字N，表示里程表的读数。
(1<=N<=888888888)。
输出描述
个数字，表示实际产生的费用。以回车结束。
 */
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line) => {
  let correct = 0;
  for(let i = 0; i < line.length; i++) {
    let digit = parseInt(line[i]);
    if(digit > 4) {
      digit--;
    }
    correct = correct * 9 + digit;
  }
  console.log(correct);
});