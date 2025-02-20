type Func<T = any> = (...args: any[]) => T;

function compose<T>(...fns: Func[]): Func<T> {
    if (fns.length === 0) {
        return (arg) => arg;
    }
    
    if (fns.length === 1) {
        return fns[0];
    }
    
    return fns.reduce((a, b) => (...args) => a(b(...args)));
}