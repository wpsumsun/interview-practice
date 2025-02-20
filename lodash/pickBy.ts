/**
 * Creates an object composed of the object properties predicate returns truthy for.
 * The predicate is invoked with two arguments: (value, key).
 *
 * @param {Object} object The source object
 * @param {Function} predicate The function invoked per property
 * @returns {Object} Returns the new object
 * 
 * @example
 * const object = { 'a': 1, 'b': '2', 'c': 3 };
 * 
 * pickBy(object, value => typeof value === 'number');
 * // => { 'a': 1, 'c': 3 }
 */
function pickBy<T extends object>(
    object: T,
    predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T> {
    if (object == null) {
        return {};
    }

    const result: Partial<T> = {};

    Object.entries(object).forEach(([key, value]) => {
        if (predicate(value as T[keyof T], key as keyof T)) {
            result[key as keyof T] = value as T[keyof T];
        }
    });

    return result;
}

export default pickBy;