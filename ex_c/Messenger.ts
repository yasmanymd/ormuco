import * as amqp from 'amqplib';

export interface IInitiable {
    init(): Promise<void>;
}

export interface IDisposable {
    dispose(): void;
}

interface IPublisher {
    publishMessage(message: string): Promise<void>;
}

interface ISubscriber {
    subscribeToQueue(callback: (msg: amqp.ConsumeMessage | null) => void): Promise<void>;
}

export interface IMessenger extends IPublisher, ISubscriber, IInitiable, IDisposable {
}

export default class Messenger implements IMessenger {
    private exchange: string = "myExchange";
    private connection: amqp.Connection | null = null;
    private channel: amqp.Channel | null = null;
    private name: string;

    constructor(private amqpUrl: string, name: string) {
        this.name = name;
    }

    async init() {
        this.connection = await amqp.connect(this.amqpUrl);
        this.channel = await this.connection.createChannel();
        //console.log(`${this.name} - Assert Exchange`)
        await this.channel?.assertExchange(this.exchange, 'fanout', { durable: false });
    }

    async publishMessage(message: string) {
        //console.log(`${this.name} - Publish Message`)
        this.channel?.publish(this.exchange, '', Buffer.from(message));
    }

    async subscribeToQueue(callback: (msg: amqp.ConsumeMessage | null) => void) {
        //console.log(`${this.name} - Assert Queue`)
        let result = await this.channel?.assertQueue('', { exclusive: true });
        //console.log(`${this.name} - Asserted Queue - ${result?.queue}`)
        if (result) {
            const queueName = result.queue;
            //console.log(`${this.name} - Bind Queue`)
            this.channel?.bindQueue(queueName, this.exchange, '')
            //console.log(`${this.name} - Consume Queue`)
            this.channel?.consume(queueName, callback, { noAck: true });
        }
    }

    async dispose() {
        //console.log(`${this.name} - Disconnect`)
        await this.channel?.close();
        await this.connection?.close();
    }
}