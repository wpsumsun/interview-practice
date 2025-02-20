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