import { BaseQueue } from "./queue-service/base-queue";
import { InMemoryQueue } from "./queue-service/inmemory-queue";

console.log("hello world");

const queue:BaseQueue = new InMemoryQueue({name:'test'});

for(let i=0;i<10;i++){
   queue.add(i);

}

for(let i=0;i<10;i++){
    console.log(queue.remove());
}

console.log(queue);