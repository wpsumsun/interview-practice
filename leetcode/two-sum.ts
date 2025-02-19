function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    for(let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) {
            return [i, map.get(diff)!];
        } else {
            map.set(nums[i], i);
        }
    }
    throw new Error('No solution found');
}