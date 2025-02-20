// 允许重复数字的验证码
function generateVerifyCode(): string {
    return Math.random()
        .toString()
        .slice(2, 8);
}

// 不允许重复数字的验证码
function generateUniqueVerifyCode(): string {
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result: number[] = [];
    
    // 从后向前选择数字，确保随机性
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        result.push(digits[randomIndex]);
        digits.splice(randomIndex, 1);  // 移除已使用的数字
    }
    
    return result.join('');
} 