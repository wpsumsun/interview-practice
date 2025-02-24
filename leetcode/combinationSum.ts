/**
 * https://leetcode.cn/problems/combination-sum/
 */

function combinationSum(candidates: number[], target: number): number[][] {
    candidates.sort((a, b)=> a - b);
    const result = [];
    const path = [];

    const dfs = (i, s) => {
        if (s === 0) {
            result.push([...path]);
            return;
        }
        if (s < candidates[i]) {
            return;
        }
        for (let j = i; j < candidates.length; j++) {
            path.push(candidates[j]);
            dfs(j, s - candidates[j]);
            path.pop();
        }
    }  

    dfs(0, target);
    return result;
};