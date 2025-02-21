interface QueryParams {
    [key: string]: string | string[] | undefined;
}

function parseQueryString(url: string): QueryParams {
    // 如果没有查询字符串，返回空对象
    if (!url.includes('?')) {
        return {};
    }
    
    // 获取查询字符串部分
    const queryString = url.split('?')[1];
    if (!queryString) {
        return {};
    }
    
    const result: QueryParams = {};
    
    // 处理查询参数
    queryString.split('&').forEach(pair => {
        // 处理空字符串
        if (!pair) return;
        
        // 分割键值对
        const [key, value] = pair.split('=').map(decodeURIComponent);
        
        // 如果没有值，设为空字符串
        const decodedValue = value === undefined ? '' : value;
        
        // 处理数组参数 (例如: key[]=value1&key[]=value2)
        if (key.endsWith('[]')) {
            const arrayKey = key.slice(0, -2);
            if (!result[arrayKey]) {
                result[arrayKey] = [];
            }
            (result[arrayKey] as string[]).push(decodedValue);
        } else {
            // 如果已存在相同的键，转换为数组
            if (key in result) {
                if (Array.isArray(result[key])) {
                    (result[key] as string[]).push(decodedValue);
                } else {
                    result[key] = [result[key] as string, decodedValue];
                }
            } else {
                result[key] = decodedValue;
            }
        }
    });
    
    return result;
} 