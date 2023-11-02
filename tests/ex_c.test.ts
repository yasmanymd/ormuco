import CacheManager, { ICacheManager } from "../ex_c/CacheManager";
import Messenger from "../ex_c/Messenger";
import LRUCache, { ICache } from "../ex_c/lruCache";

function wait(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

let m1: ICacheManager, m2: ICacheManager, m3: ICacheManager, m4: ICacheManager;

describe('Test', () => {
    beforeEach(async () => {
        let f1 = async () => {
            m1 = new CacheManager(new LRUCache(4, 5000), new Messenger("amqp://guest:guest@localhost:5672", "M1"));
            await m1.init();
        }

        let f2 = async () => {
            m2 = new CacheManager(new LRUCache(4, 5000), new Messenger("amqp://guest:guest@localhost:5672", "M2"));
            await m2.init();
        }

        let f3 = async () => {
            m3 = new CacheManager(new LRUCache(4, 5000), new Messenger("amqp://guest:guest@localhost:5672", "M3"));
            await m3.init();
        }

        let f4 = async () => {
            m4 = new CacheManager(new LRUCache(4, 5000), new Messenger("amqp://guest:guest@localhost:5672", "M4"));
            await m4.init();
        }

        await Promise.all([f1(), f2(), f3(), f4()]);
        await wait(100)
    });

    afterEach(async () => {
        await m1.dispose();
        await m2.dispose();
        await m3.dispose();
        await m4.dispose();
    });

    it('Test 1', async () => {
        m1.set("1", 1);
        m2.set("2", 2);
        m3.set("3", 3);
        m4.set("4", 4);

        await wait(100);

        expect(m1.get("1")).toBe(1);
        expect(m1.get("2")).toBe(2);
        expect(m1.get("3")).toBe(3);
        expect(m1.get("4")).toBe(4);

        expect(m2.get("1")).toBe(1);
        expect(m2.get("2")).toBe(2);
        expect(m2.get("3")).toBe(3);
        expect(m2.get("4")).toBe(4);

        expect(m3.get("1")).toBe(1);
        expect(m3.get("2")).toBe(2);
        expect(m3.get("3")).toBe(3);
        expect(m3.get("4")).toBe(4);

        expect(m4.get("1")).toBe(1);
        expect(m4.get("2")).toBe(2);
        expect(m4.get("3")).toBe(3);
        expect(m4.get("4")).toBe(4);
    });
});