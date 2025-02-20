function sample<T>(array: T[]): T | undefined {
    if (!array || !array.length) return undefined;
    return array[Math.floor(Math.random() * array.length)];
}