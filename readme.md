
## Ormuco

### How to run the tests

After clone the project. Please run: 

```
docker compose up -d
```
Once RabbitMQ is running you can run following commands for installing and execute the tests: 
```
npm install
npm test
```

### Question A

You can find the solution of question A in folder ex_a, the unit tests are located in tests/ex_a.test.ts.

Assumptions: 
1. I'm assuming overlaped points like (1, 3), (3, 5).
2. The order of (x, y) doesn't matter, (1, 3) is the same to (3, 1).

---

### Question B

You can find the solution of question B in folder ex_b, the unit tests are located in tests/ex_b.test.ts.

Assumptions: 
1. The exercise doesn't mention the return value, so similar to compare function I'm returning 1 for greater than, 0 for equal to and -1 for less than.

---

### Question C

The GeoLocation Cache system have two main components, Cache and RabbitMQ, is designed to efficiently store and manage data across different geographical locations. This system addresses the challenge of minimizing latency and ensuring data availability in a distributed environment.

#### Design System

The solution will have 2 main components: 

1. Cache: 
    * The Cache component is responsible for storing and managing data in memory. It serves as a fast-access storage mechanism, allowing quick retrieval of frequently accessed data.
    * Each node (representing a geographical location) has its own local cache. This cache holds a subset of data relevant to that specific location.
    * The cache employs a Least Recently Used (LRU) strategy to efficiently manage memory and prioritize frequently accessed data.
    * Data in the cache will have expiration times (Time To Live, TTL) to ensure that stale data is eventually refreshed.
2. RabbitMQ:
    * RabbitMQ will be used as message broker that facilitates communication between nodes in the GeoLocation Cache system. It provides a reliable way for nodes to exchange messages.
    * Messages will be used to notify other nodes of updates.
    * RabbitMQ supports a publish-subscribe model, allowing nodes to broadcast messages to all subscribers efficiently.
    * It helps maintain data consistency and synchronization across different geographical locations.

Workflow

1. Data Access: 
    * When a node receives a request for data, it first checks its local cache. If the data is present, it is quickly returned.
    * If the data is not in the local cache it returns null.
2. Message Exchange:
    * RabbitMQ ensures that the inserted/updated values is delivered to all nodes in the system, regardless of their geographical location.
3. Cache Update:
    * When data is inserted/updated in one node, it notifies other nodes through RabbitMQ. This ensures that other nodes can update their caches accordingly.

Benefits:

1. Reduced Latency: By utilizing local caches, nodes can quickly access frequently used data without making round-trip requests to distant servers.

2. Data Consistency: RabbitMQ helps maintain data consistency across nodes. When data is updated, all nodes are notified to ensure they have the latest information.

3. Fault Tolerance: In case of node failures, RabbitMQ ensures that messages are not lost.

4. Scalability: The system can easily scale by adding more nodes. RabbitMQ facilitates communication regardless of the number of nodes.

Design Pattern:

The combination of a cache system and a message broker like RabbitMQ follows a variation of the Publish-Subscribe pattern. This pattern allows nodes to publish messages (inserts, updates, deletes) ensuring efficient communication across the system.

The Cache Component: 

The cache component consists of three main classes: 

1. Cache Manager:
* The Cache Manager acts as the central orchestrator of the caching system. It oversees the integration of the LRUCache strategy and the Messenger component, ensuring seamless communication with RabbitMQ.
* This class implements well-defined interfaces, making it highly adaptable and easy to test. It allows for the flexibility to incorporate different caching strategies and communication protocols with RabbitMQ.
2. LRUCache (Least Recently Used Cache Strategy):
* The LRUCache is a critical component within the Cache Manager. It serves as the primary data storage mechanism, employing a Least Recently Used strategy to efficiently manage data access.
* This cache strategy ensures that frequently accessed data remains readily available, while less accessed data is evicted from the cache. It enhances data retrieval performance, particularly in scenarios with limited memory resources.
3. Messenger:
* The Messenger component acts as the communication bridge between the Cache Manager and RabbitMQ. It handles the transmission of messages, enabling seamless interaction between nodes in different geographical locations.
* By implementing specific interfaces, the Messenger component can be easily tested or extended to support various communication protocols.

Interfaces for Flexibility and Testability:

The implementation leverages interfaces to enhance flexibility and facilitate testing.

Message Format and Example:

The message format utilized in the system is JSON. An example message is as follows:

```
{
    "sender": "unique_sender_id",
    "cmd": "set/del", 
    "args": {
        "key": "unique_key",
        "value": "cached_value"
    }
}
```

Sorry for including in last exercise a simple integration test. I wanted to include more complex tests, even some test with mocks, but the time was limited. 

### Thanks and happy review

