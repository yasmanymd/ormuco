import { IInitiable, IMessenger } from "./Messenger";
import { ICache } from "./lruCache";
const { v4: uuidv4 } = require('uuid');

export interface ICacheManager extends IInitiable, ICache { }

export default class CacheManager implements ICacheManager {
    private cache: ICache;
    private messenger: IMessenger;
    private id: string;
    private replicate: boolean;

    constructor(cache: ICache, messenger: IMessenger) {
        this.cache = cache;
        this.messenger = messenger;
        this.id = uuidv4();
        this.replicate = true;
    }

    async init() {
        let self: any = this;
        await this.messenger.init();
        await this.messenger.subscribeToQueue((msg: any) => {
            let obj = JSON.parse(msg.content.toString());
            //console.log(`Object received: ${msg.content.toString()}`)
            if (obj.sender != self.id) {
                const methodName = obj.cmd;
                const methodArgs = Object.values(obj.args);

                //Security check
                if (methodName === 'set' || methodName === 'del') {
                    //console.log(`Executing ${methodName} with key ${obj.args.key} in ${self.messenger.name} `)
                    self.replicate = false;
                    self[methodName](...methodArgs);
                    self.replicate = true;
                } else {
                    console.error(`Method ${methodName} not valid.`);
                }
            }
        });
    }

    get(key: string) {
        return this.cache.get(key);
    }

    set(key: string, value: any): void {
        this.cache.set(key, value);
        this.replicate && this.messenger.publishMessage(JSON.stringify({
            sender: this.id,
            cmd: 'set',
            args: {
                key: key,
                value: value
            }
        }));
    }

    del(key: string): void {
        this.cache.del(key);
        this.replicate && this.messenger.publishMessage(JSON.stringify({
            sender: this.id,
            cmd: 'del',
            args: {
                key: key
            }
        }));
    }

    dispose() {
        this.messenger.dispose();
    }
}