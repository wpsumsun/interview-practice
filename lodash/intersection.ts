/**
 * Creates an array of unique values that are included in all given arrays.
 * The order and references of result values are determined by the first array.
 *
 * @param {...Array} arrays The arrays to inspect
 * @returns {Array} Returns the new array of intersecting values
 * 
 * @example
 * intersection([2, 1], [2, 3]); 
 * // => [2]
 * 
 * intersection([2, 1], [2, 3], [2, 4]); 
 * // => [2]
 * 
 * intersection(['a', 'b'], ['b', 'c'], ['b', 'e']); 
 * // => ['b']
 */
function intersection<T>(...arrays: T[][]): T[] {
    if (arrays.length === 0) return [];
    if (arrays.length === 1) return [...new Set(arrays[0])];

    const firstArray = arrays[0];
    const otherArrays = arrays.slice(1);

    return firstArray.filter(item => 
        otherArrays.every(array => array.includes(item))
    );
}

export default intersection; 