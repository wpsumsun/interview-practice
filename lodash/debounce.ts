function debounce<T extends (...args: any[]) => any>(fn: T, wait: number = 300) {
    let timer: ReturnType<typeof setTimeout> | null = null;
    let _this = this;
    return function(...args: Parameters<T>) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(_this, args);
        }, wait);
    }
    
}