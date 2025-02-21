function formatNumberWithCommas(num: number): string {
    return num.toLocaleString('en-US');
}

function formatNumberWithCommasRegex(num: number): string {
    const numStr = num.toString();
    const regex = /(\d)(?=(\d{3})+(?!\d))/g;
    return numStr.replace(regex, '$1,');
}

// 示例
console.log(formatNumberWithCommas(1234567)); // 输出: "1,234,567"
console.log(formatNumberWithCommas(9876543210)); // 输出: "9,876,543,210"
console.log(formatNumberWithCommasRegex(1234567)); // 输出: "1,234,567"
console.log(formatNumberWithCommasRegex(9876543210)); // 输出: "9,876,543,210" 