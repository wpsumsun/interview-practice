function isEqual(value: any, other: any): boolean {
    // 处理基本类型比较
    if (value === other) {
        return true;
    }
    
    // 处理 null 和 undefined
    if (value === null || other === null || 
        value === undefined || other === undefined) {
        return value === other;
    }
    
    // 获取类型
    const valueType = Object.prototype.toString.call(value);
    const otherType = Object.prototype.toString.call(other);
    
    // 类型不同直接返回 false
    if (valueType !== otherType) {
        return false;
    }
    
    // 处理日期对象
    if (value instanceof Date) {
        return value.getTime() === other.getTime();
    }
    
    // 处理正则表达式
    if (value instanceof RegExp) {
        return value.toString() === other.toString();
    }
    
    // 处理数组和对象
    if (typeof value === 'object') {
        const valueKeys = Object.keys(value);
        const otherKeys = Object.keys(other);
        
        // 键的数量不同
        if (valueKeys.length !== otherKeys.length) {
            return false;
        }
        
        // 递归比较每个属性
        return valueKeys.every(key => 
            otherKeys.includes(key) && isEqual(value[key], other[key])
        );
    }
    
    return false;
}