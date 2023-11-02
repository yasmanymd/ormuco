import { IDisposable } from "./Messenger";

export interface ICache extends IDisposable {
    get(key: string): any;
    set(key: string, value: any): void;
    del(key: string): void;
}

export default class LRUCache implements ICache {
    capacity: number;
    defaultTTL: number;
    cache: Map<any, any>;
    head: any;
    tail: any;
    sortedHead: any;
    sortedTail: any;

    constructor(capacity: number, defaultTTL: number) {
        this.capacity = capacity;
        this.defaultTTL = defaultTTL;
        this.cache = new Map();
        this.head = null;
        this.tail = null;
        this.sortedHead = null;
        this.sortedTail = null;
    }

    dispose(): void { }

    get(key: string): any {
        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            if (this.isExpired(node)) {
                this.removeNode(node);
                this.cache.delete(key);
                return null;
            }
            this.moveToHead(node);
            return node.value;
        }
        return null;
    }

    set(key: string, value: any, ttl: number = this.defaultTTL): void {
        this.removeExpired();
        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            node.value = value;
            node.ttl = Date.now() + ttl;
            this.addExpired(node);
            this.moveToHead(node);
        } else {
            const newNode = { key, value, next: null, prev: null, ttl: Date.now() + ttl };
            this.addExpired(newNode);
            this.addToHead(newNode);
            this.cache.set(key, newNode);

            if (this.cache.size > this.capacity) {
                const removedNode = this.removeTail();
                this.cache.delete(removedNode.key);
            }
        }
    }

    del(key: string): void {
        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            this.removeNode(node);
            this.cache.delete(key);
        }
    }

    private addExpired(node: any) {
        const newNode = { key: node.key, ttl: node.ttl, next: null };
        if (this.sortedTail == null) {
            this.sortedHead = newNode;
        } else {
            this.sortedTail.next = newNode;
        }
        this.sortedTail = newNode;
    }

    private removeExpired() {
        while (this.sortedHead && this.isExpired(this.sortedHead)) {
            if (this.cache.has(this.sortedHead.key)) {
                const node = this.cache.get(this.sortedHead.key);
                if (this.isExpired(node)) {
                    this.removeNode(node);
                }
            }
            this.sortedHead = this.sortedHead.next;
        }
        if (this.sortedHead == null) {
            this.sortedTail = null;
        }
    }

    private isExpired(node: any): boolean {
        return node.ttl !== null && node.ttl < Date.now();
    }

    private moveToHead(node: any): void {
        this.removeNode(node);
        this.addToHead(node);
    }

    private addToHead(node: any): void {
        node.next = this.head;
        node.prev = null;
        if (this.head) {
            this.head.prev = node;
        } else {
            this.tail = node;
        }
        this.head = node;
    }

    private removeNode(node: any): void {
        if (node) {
            if (node == this.tail) {
                this.tail = node.prev;
            }
            if (node == this.head) {
                this.head = node.next;
            }
            if (node.prev) {
                node.prev.next = node.next;
            }
            if (node.next) {
                node.next.prev = node.prev;
            }
        }
    }

    private removeTail(): any {
        const tailNode = this.tail;
        if (tailNode) {
            this.removeNode(tailNode);
        }
        return tailNode;
    }

    //Tool to see state of linking list
    /*print() {
        let node = this.head;
        let s = '';
        while (node) {
            s += `[key: ${node.key}, value: ${node.value}, ttl: ${node.ttl}]\r\n`
            node = node.next;
        }
        s += `head: ${this.head?.key}\r\n`
        s += `tail: ${this.tail?.key}\r\n`
        console.log(s);
    }*/
}
