/**
 * 题目描述
某个开源社区希望将最近热度比较高的开源项目出一个榜单，推荐给社区里面的开发者。对于每个开源项目，开发者可以进行关注(watch).
收藏(star)、fork、提issue、提交合并请求(MR)等。
数据库里面统计了每个开源项目关注、收藏、fork、issue、MR的数量，开源项目的热度根据这5个维度的加权求和进行排序。
1 H=(Wwatch * #watch)+(Wstar * #star)+(Wfork* #fork)+ (Wissue* #issue)+(Wmr * #mr)
H表示热度值
Wwatch、Wstar、Wfork、Wissue、Wmr分别表示5个统计维度的权重.
#watch、#star、#fork、#issue、#mr分别表示5个统计维度的统计值。
榜单按照热度值降序排序，对于热度值相等的，按照项目名字转换为全小写字母后的字典序排序('a,'b',c…,'x,y,z)。
输入描述
第一行输入为N，表示开源项目的个数，0<N<100。
第二行输入为权重值列表，一共5个整型值，分别对应关注、收藏、fork、issue、MR的权重，权重取值0<W≤50。第三行开始接下来的 N 行为开源项目的统计维度，每一行的格式为:
1 name nr watch nr start nr fork nr issue nr mr
其中 name 为开源项目的名字，由英文字母组成，长度≤50，其余5个整型值分别为该开源项目关注、收藏、fork、issue、MR的数量，数量取值 0<nr≤1000.
输出描述
按照热度降序，输出开源项目的名字，对于热度值相等的，按照项目名字转换为全小写后的字典序排序('a’>'b'>'c'>...> 'x'> 'y'> 'z')。
用例1
输入
4
8 6 2 8 6
camila 66 70 46 158 80
victoria 94 76 86 189 211
anthony 29 17 83 21 48
emily 53 97 1 19 2186
输出
victoria
camila
emily
anthony
说明
排序热度值计算:
camila:66*8+70*6+46*2+158*8+80*6=2784
victoria:94*8+76*6+86*2+189*8+211*6=4158
anthony:29*8+17*6+83*2+21*8+48*6=956emily: 53*8+97*6+1*2+ 19*8+218*6=2468
 */

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 创建一个数组用于存储用户的输入
let input = [];

// 当接收到一行输入时，将其去除首尾空格后添加到input数组中
rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => { 
  // 当输入结束时，执行以下代码
  // 读取项目数量n
  const n = parseInt(input[0]);
  
  // 读取权重数组，将其转换为数字数组
  const weights = input[1].split(' ').map(Number);
  
  // 创建一个数组用于存储项目信息
  let projects = [];
  
  // 读取每个项目的信息
  for(let i = 2; i < 2 + n; i++) {
    // 将项目信息分割为名称和评分数组
    const project = input[i].split(' ');
    const name = project[0];
    const scores = project.slice(1).map(Number);
    
    // 计算项目的热度
    let hotness = 0;
    for(let j = 0; j < 5; j++) {
      hotness += scores[j] * weights[j];
    }
    
    // 将项目的名称和热度添加到projects数组中
    projects.push({ name, hotness });
  }

  // 对项目数组进行排序，首先根据热度降序排序，如果热度相同则根据名称升序排序
  projects.sort((a, b) => {
    if(a.hotness !== b.hotness) {
      return b.hotness - a.hotness;
    } else {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    }
  });
  
  // 遍历排序后的项目数组并打印项目名称
  for(let project of projects) {
    console.log(project.name);
  }
});