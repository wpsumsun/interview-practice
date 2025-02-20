/**
 * Creates an array of array values not included in the other given arrays.
 * The order and references of result values are determined by the first array.
 *
 * @param {Array} array The array to inspect
 * @param {...Array} [values] The values to exclude
 * @returns {Array} Returns the new array of filtered values
 * 
 * @example
 * difference([2, 1], [2, 3]);
 * // => [1]
 * 
 * difference([2, 1, 2, 3], [3, 4], [2]);
 * // => [1]
 * 
 * difference(['a', 'b', 'c'], ['b', 'c'], ['c']);
 * // => ['a']
 */
function difference<T>(array: T[], ...values: T[][]): T[] {
    if (!array || array.length === 0) {
        return [];
    }

    if (values.length === 0) {
        return [...array];
    }

    // 将所有要排除的值放入 Set 中以提高查找效率
    const excludeSet = new Set(values.flat());

    return array.filter(item => !excludeSet.has(item));
}

export default difference; 