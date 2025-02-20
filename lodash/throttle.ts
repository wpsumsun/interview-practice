function throttle<T extends (...args: any[]) => any>(fn: T, wait: number = 300, immediate = true) {
    let previous = immediate ? 0 : Date.now();
    return function(...args: Parameters<T>) {
        const now = Date.now();
        if (now - previous >= wait) {
            previous = now;
            fn.apply(this, args);
        }
    }
}
// 定时器版本
function throttleImplementBySettimeout<T extends (...args: any[]) => any>(fn: T, wait: number = 300, immediate = true) {
    let timer: ReturnType<typeof setTimeout> | null = null;
    let previous = false;  // 标记是否在冷却中
    return function(...args: Parameters<T>) {
        if (!previous) {
            fn.apply(this.args);
            previous = true;
        }
        timer = setTimeout(() => {
            previous = false;
        }, wait);

    }
}