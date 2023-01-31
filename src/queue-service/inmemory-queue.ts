import { Job } from "../types/Job";
import { BaseQueue, QueueParams } from "./base-queue";

export class Queue <T>{
  queue = Array<T>();
  size: number = 0;
  add(job: T) {
    this.queue.push(job);
    this.size++;
  }
  remove() {
    if (this.size > 0){
        this.size--
        return this.queue.shift();    
    };
    return this.queue.shift();
  }
}

export class InMemoryQueue extends BaseQueue {
    queue = new Queue<Job>();
    constructor(queueParams:QueueParams){
        super(queueParams);
    }
    add(data: any): void {
        this.queue.add(this.generateJob(data));
    }
    remove(){
        return this.queue.remove();
    }
    subscribe(name: string, fn: Function): void {
        console.log('subscriber added');
    }
 
}
