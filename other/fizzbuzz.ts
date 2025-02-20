function fizzbuzz(num: number): string | number {
    let result = '';
    
    if (!(num % 3)) result += 'fizz';
    if (!(num % 5)) result += 'buzz';
    
    return result || num;
}