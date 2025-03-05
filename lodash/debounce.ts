function debounce<T extends (...args: any[]) => any>(fn: T, wait: number = 300, immediate: boolean = false) {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return function(...args: Parameters<T>) {
        if (timer) {
            clearTimeout(timer);
        }

        if (!timer && immediate) {
            fn.apply(this, args);
        }

        timer = setTimeout(() => {
            fn.apply(this, args);
        }, wait);
    }
    
}

function add1(a, b) {
    return Promise.resolve(a + b);
}

async function sum1(arr) {
    if (arr.length === 0) return 0;
    if (arr.length === 1) return arr[0];
    const pairs = [];
    for(let i =0;i<arr.length;i+=2) {
        pairs.push(arr.slice(i, i+2));
    }
    const result = await Promise.all(pairs.map(pair => {
        return pair.length === 1 ? pair[0] : add1(pair[0], pair[1])
    }))
    return result.length === 1 ? result[0] : sum1(result);
}