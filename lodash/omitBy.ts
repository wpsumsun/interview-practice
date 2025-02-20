/**
 * The opposite of `pickBy`; this method creates an object composed of the own and 
 * inherited enumerable string keyed properties of `object` that `predicate` doesn't 
 * return truthy for.
 *
 * @param {Object} object The source object
 * @param {Function} predicate The function invoked per property
 * @returns {Object} Returns the new object
 * 
 * @example
 * const object = { 'a': 1, 'b': '2', 'c': 3 };
 * 
 * omitBy(object, value => typeof value === 'number');
 * // => { 'b': '2' }
 */
function omitBy<T extends object>(
    object: T,
    predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T> {
    if (object == null) {
        return {};
    }

    const result: Partial<T> = {};

    Object.entries(object).forEach(([key, value]) => {
        if (!predicate(value as T[keyof T], key as keyof T)) {
            result[key as keyof T] = value as T[keyof T];
        }
    });

    return result;
}

export default omitBy;