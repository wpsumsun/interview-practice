/**
 * Converts string to camel case.
 * 
 * @param {string} string The string to convert
 * @returns {string} Returns the camel cased string
 * 
 * @example
 * camelCase('Foo Bar');     // => 'fooBar'
 * camelCase('--foo-bar--'); // => 'fooBar'
 * camelCase('__FOO_BAR__'); // => 'fooBar'
 * camelCase('foo.bar');     // => 'fooBar'
 * camelCase('foo-bar');     // => 'fooBar'
 */
function camelCase(string: string): string {
    if (!string) {
        return '';
    }

    return string
        // 将字符串分割成单词
        .replace(/['\u2019]/g, '') // 移除撇号
        .replace(/[-_.\s]+/g, ' ')  // 将所有分隔符转换为空格
        // 分割单词并处理
        .split(/[\s]+/)
        .reduce((result: string[], word: string, index: number) => {
            if (!word) return result;
            
            // 转换为小写并处理首字母大写
            word = word.toLowerCase();
            if (index !== 0) {
                word = word.charAt(0).toUpperCase() + word.slice(1);
            }
            
            result.push(word);
            return result;
        }, [])
        .join('');
}

export default camelCase;