type EventCallback = (...args: any[]) => void;

class EventEmitter {
    private events: Map<string, EventCallback[]>;

    constructor() {
        this.events = new Map();
    }

    /**
     * 订阅事件
     * @param eventName 事件名称
     * @param callback 回调函数
     */
    on(eventName: string, callback: EventCallback): void {
        const callbacks = this.events.get(eventName) || [];
        callbacks.push(callback);
        this.events.set(eventName, callbacks);
    }

    /**
     * 取消订阅
     * @param eventName 事件名称
     * @param callback 回调函数
     */
    off(eventName: string, callback: EventCallback): void {
        const callbacks = this.events.get(eventName);
        if (!callbacks) return;
        
        const index = callbacks.indexOf(callback);
        if (index !== -1) {
            callbacks.splice(index, 1);
        }
        
        if (callbacks.length === 0) {
            this.events.delete(eventName);
        }
    }

    /**
     * 发布事件
     * @param eventName 事件名称
     * @param args 传递的参数
     */
    emit(eventName: string, ...args: any[]): void {
        const callbacks = this.events.get(eventName);
        callbacks?.forEach(callback => {
            try {
                callback(...args);
            } catch (error) {
                console.error('Event callback error:', error);
            }
        });
    }

    /**
     * 只订阅一次
     * @param eventName 事件名称
     * @param callback 回调函数
     */
    once(eventName: string, callback: EventCallback): void {
        const wrapper = (...args: any[]) => {
            callback(...args);
            this.off(eventName, wrapper);
        };
        this.on(eventName, wrapper);
    }

    /**
     * 清除所有订阅
     * @param eventName 可选，指定清除的事件名称
     */
    clear(eventName?: string): void {
        if (eventName) {
            this.events.delete(eventName);
        } else {
            this.events.clear();
        }
    }
}

// 使用示例
const eventBus = new EventEmitter();

// 订阅事件
const handler1 = (data: any) => {
    console.log('Handler1 received:', data);
};

const handler2 = (data: any) => {
    console.log('Handler2 received:', data);
};

// 常规订阅
eventBus.on('test', handler1);

// 一次性订阅
eventBus.once('test', handler2);

// 发布事件
eventBus.emit('test', { message: 'Hello World' });
// 输出:
// Handler1 received: { message: 'Hello World' }
// Handler2 received: { message: 'Hello World' }

// 再次发布
eventBus.emit('test', { message: 'Hello Again' });
// 输出:
// Handler1 received: { message: 'Hello Again' }
// (handler2 不会再收到消息，因为是 once)

// 取消订阅
eventBus.off('test', handler1);

// 清除所有订阅
eventBus.clear();