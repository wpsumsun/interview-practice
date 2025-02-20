function deepClone<T>(obj: T, hash = new WeakMap()): T {
    if (obj === null || typeof obj !== 'object') return obj;
    
    if (hash.has(obj)) return hash.get(obj);

    if (obj instanceof Date) {
        return new Date(obj) as unknown as T;
    }
    if (obj instanceof RegExp) { 
        return new RegExp(obj) as unknown as T;
    }
    const clone = Array.isArray(obj) ? [] : {};
    hash.set(obj, clone);

    Object.keys(obj).forEach(key => {
        clone[key] = deepClone(obj[key], hash);
    })

    return clone as T;
}