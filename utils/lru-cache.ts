class LRUCache<K, V> {
    private cache: Map<K, V>;
    private readonly capacity: number;
    
    constructor(capacity: number) {
        this.cache = new Map();
        this.capacity = capacity;
    }
    
    // 获取值
    get(key: K): V | null {
        if (!this.cache.has(key)) {
            return null;
        }
        
        // 获取值
        const value = this.cache.get(key)!;
        
        // 删除后重新插入，使其成为最新使用的
        this.cache.delete(key);
        this.cache.set(key, value);
        
        return value;
    }
    
    // 设置值
    put(key: K, value: V): void {
        // 如果key已存在，先删除
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        // 如果缓存满了，删除最久未使用的（第一个）
        else if (this.cache.size >= this.capacity) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        // 插入新值
        this.cache.set(key, value);
    }
    
    // 获取当前缓存大小
    size(): number {
        return this.cache.size;
    }
    
    // 清空缓存
    clear(): void {
        this.cache.clear();
    }
    
    // 检查key是否存在
    has(key: K): boolean {
        return this.cache.has(key);
    }
}

// 使用双向链表实现的版本（性能更好）
class ListNode<K, V> {
    key: K;
    value: V;
    prev: ListNode<K, V> | null = null;
    next: ListNode<K, V> | null = null;
    
    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }
}

class LRUCacheWithList<K, V> {
    private cache: Map<K, ListNode<K, V>>;
    private head: ListNode<K, V>;
    private tail: ListNode<K, V>;
    private readonly capacity: number;
    
    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();
        
        // 创建哨兵节点
        this.head = new ListNode<K, V>(null as K, null as V);
        this.tail = new ListNode<K, V>(null as K, null as V);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    
    private addToFront(node: ListNode<K, V>): void {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next!.prev = node;
        this.head.next = node;
    }
    
    private removeNode(node: ListNode<K, V>): void {
        node.prev!.next = node.next;
        node.next!.prev = node.prev;
    }
    
    private moveToFront(node: ListNode<K, V>): void {
        this.removeNode(node);
        this.addToFront(node);
    }
    
    get(key: K): V | null {
        const node = this.cache.get(key);
        if (!node) return null;
        
        // 移动到链表头部
        this.moveToFront(node);
        return node.value;
    }
    
    put(key: K, value: V): void {
        const existingNode = this.cache.get(key);
        
        if (existingNode) {
            // 更新现有节点
            existingNode.value = value;
            this.moveToFront(existingNode);
        } else {
            // 创建新节点
            const newNode = new ListNode(key, value);
            
            // 如果缓存满了，删除最久未使用的
            if (this.cache.size >= this.capacity) {
                const lruNode = this.tail.prev!;
                this.removeNode(lruNode);
                this.cache.delete(lruNode.key);
            }
            
            this.cache.set(key, newNode);
            this.addToFront(newNode);
        }
    }
} 