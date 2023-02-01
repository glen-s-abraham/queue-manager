import { BaseQueue } from "./queue-service/base-queue";
import { InMemoryQueue } from "./queue-service/inmemory-queue";
import { QueueManager } from "./queue-service/queue-manager";

const queue:QueueManager = new QueueManager({name:'test'});

for(let i=0;i<10;i++){
   queue.add(i);

}

