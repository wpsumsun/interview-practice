/**
 * 题目描述: 全量和已占用字符集、字符串统计(分值100)给定两个字符集合，一个是全量字符集，一个是已占用字符集，已占用字符集中的字符不能再使用。要求输出剩余可用字符集。
输入描述
1.输入一个字符串 一定包含@，@前为全量字符集 @后的为已占用字符集2.已占用字符集中的字符一定是全量字符集中的字符
3.字符集中的字符跟字符之间使用英文逗号隔开
4.每个字符都表示为字符+数字的形式用英文冒号分隔，比如a:1标识一个a字符
5.字符只考虑英文字母，区分大小写
6.数字只考虑正整型 不超过100
7.如果一个字符都没被占用 @标识仍存在，例如 a:3,b:5,c:2@
输出描述
输出可用字符集
·不同的输出字符集之间用回车换行
·注意 输出的字符顺序要跟输入的一致，如下面用例不能输出b:3,a:2,c:2
如果某个字符已全部占用 则不需要再输出
。
 */

function calculateAvailableCharacterSet(input: string): string {
    const [fullSet, occupiedSet] = input.split('@');
    
    const parseCharacterSet = (set: string) => {
        const map: Map<string, number> = new Map();
        if (set.trim() === '') return map;
        
        set.split(',').forEach(item => {
            const [char, count] = item.split(':');
            map.set(char, parseInt(count, 10));
        });
        
        return map;
    };
    
    const fullMap = parseCharacterSet(fullSet);
    const occupiedMap = parseCharacterSet(occupiedSet);
    
    const availableCharacters: string[] = [];
    
    fullMap.forEach((count, char) => {
        const occupiedCount = occupiedMap.get(char) || 0;
        const availableCount = count - occupiedCount;
        
        if (availableCount > 0) {
            availableCharacters.push(`${char}:${availableCount}`);
        }
    });
    
    return availableCharacters.join('\n');
}

// Example usage:
const input = "a:3,b:5,c:2@a:1,b:2";
console.log(calculateAvailableCharacterSet(input));
