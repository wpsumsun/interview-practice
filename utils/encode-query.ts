interface QueryParams {
    [key: string]: string | number | boolean | null | undefined;
}

function encodeQueryString(params: QueryParams): string {
    if (!params || Object.keys(params).length === 0) {
        return '';
    }
    
    return Object.entries(params)
        .filter(([_, value]) => value !== null && value !== undefined)
        .map(([key, value]) => {
            // 对 key 和 value 进行编码
            const encodedKey = encodeURIComponent(key);
            const encodedValue = encodeURIComponent(String(value));
            return `${encodedKey}=${encodedValue}`;
        })
        .join('&');
}

// 更复杂的版本，支持数组和嵌套对象
interface AdvancedQueryParams {
    [key: string]: any;
}

function encodeAdvancedQueryString(params: AdvancedQueryParams, parentKey: string = ''): string {
    if (!params || typeof params !== 'object') {
        return '';
    }
    
    const parts: string[] = [];
    
    for (const [key, value] of Object.entries(params)) {
        const currentKey = parentKey ? `${parentKey}[${key}]` : key;
        
        if (value === null || value === undefined) {
            continue;
        }
        
        if (Array.isArray(value)) {
            // 处理数组
            value.forEach((item, index) => {
                if (typeof item === 'object' && item !== null) {
                    parts.push(encodeAdvancedQueryString(item, `${currentKey}[${index}]`));
                } else if (item !== null && item !== undefined) {
                    parts.push(`${encodeURIComponent(currentKey)}[]=${encodeURIComponent(String(item))}`);
                }
            });
        } else if (typeof value === 'object') {
            // 处理嵌套对象
            parts.push(encodeAdvancedQueryString(value, currentKey));
        } else {
            // 处理基本类型
            parts.push(`${encodeURIComponent(currentKey)}=${encodeURIComponent(String(value))}`);
        }
    }
    
    return parts.join('&');
} 