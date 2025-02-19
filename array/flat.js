function flat(arr, depth = 1) {
    if (depth < 1) return arr;
    
    return arr.reduce((flat, item) => {
        if (Array.isArray(item)) {
            flat.push(...flat(item, depth - 1));
        } else {
            flat.push(item);
        }
        return flat;
    }, []);
}