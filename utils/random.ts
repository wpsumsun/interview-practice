function random(n: number = 6): string {
    return Math.random().toString(36).slice(2, n + 2)
}