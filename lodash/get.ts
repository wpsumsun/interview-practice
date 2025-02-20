function get(obj: any, path: string, defaultValue?: any): any {
    // 处理空值
    if (obj == null) {
        return defaultValue;
    }

    // 将路径转换为数组
    // 处理 a[0].b.c 和 a[0]["b"]["c"] 两种格式
    const keys = path
        .replace(/\[(\w+)\]/g, '.$1')  // 将 [0] 转换为 .0
        .replace(/["']/g, '')          // 移除引号
        .split('.');

    let result = obj;
    
    for (const key of keys) {
        result = result?.[key];
        
        if (result === undefined) {
            return defaultValue;
        }
    }
    
    return result;
}