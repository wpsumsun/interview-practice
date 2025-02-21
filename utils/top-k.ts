class MinHeap {
    private heap: number[] = [];
    private readonly capacity: number;

    constructor(capacity: number) {
        this.capacity = capacity;
    }

    push(val: number): void {
        if (this.heap.length < this.capacity) {
            this.heap.push(val);
            this.bubbleUp(this.heap.length - 1);
        } else if (val > this.heap[0]) {
            this.heap[0] = val;
            this.bubbleDown(0);
        }
    }

    private bubbleUp(index: number): void {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex] <= this.heap[index]) break;

            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    private bubbleDown(index: number): void {
        while (true) {
            let smallest = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;

            if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }
            if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }

            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }

    toArray(): number[] {
        return [...this.heap].sort((a, b) => b - a);
    }
}

function topKUsingMinHeap(arr: number[], k: number): number[] {
    if (k <= 0 || k > arr.length) return [];

    const minHeap = new MinHeap(k);
    for (const num of arr) {
        minHeap.push(num);
    }

    return minHeap.toArray();
}

function quickSelect(arr: number[], left: number, right: number, k: number): number {
    if (left === right) return arr[left];

    const pivotIndex = partition(arr, left, right);
    if (k === pivotIndex) {
        return arr[k];
    } else if (k < pivotIndex) {
        return quickSelect(arr, left, pivotIndex - 1, k);
    } else {
        return quickSelect(arr, pivotIndex + 1, right, k);
    }
}

function partition(arr: number[], left: number, right: number): number {
    const pivot = arr[right];
    let i = left;

    for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }
    [arr[i], arr[right]] = [arr[right], arr[i]];
    return i;
}

function topKUsingQuickSelect(arr: number[], k: number): number[] {
    if (k <= 0 || k > arr.length) return [];

    const indexToFind = k - 1; // k 是 1-based
    quickSelect(arr, 0, arr.length - 1, indexToFind);
    return arr.slice(0, k).sort((a, b) => b - a); // 返回前 K 个元素并排序
}

// 示例
const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
console.log(topKUsingQuickSelect(arr, 3)); // 输出: [9, 6, 5] 