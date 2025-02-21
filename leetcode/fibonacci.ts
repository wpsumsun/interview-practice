function generateFibonacci(n: number): number[] {
    const fibonacci: number[] = [];
    let a = 0, b = 1;

    while(a <= n) {
        fibonacci.push(a);
        const next = a + b;
        a = b;
        b = next;
    }

    return fibonacci;
}