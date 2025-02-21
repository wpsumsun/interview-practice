function stringify(data) {
    if (!data || data.length === 0) return '';
    if (typeof data === 'object') {
        return Object.keys(data).map(key => `encodeURIComponent(${key})=${encodeURIComponent(data[key])}`).join('&');
    }
    return data;
}