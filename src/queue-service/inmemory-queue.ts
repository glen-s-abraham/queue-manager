import { Job } from "../types/Job";
import { BaseQueue, QueueParams } from "./base-queue";
import { WorkerController } from "./worker-controller";

export class Queue<T> {
  queue = Array<T>();
  size: number = 0;
  add(job: T) {
    this.queue.push(job);
    this.size++;
  }
  remove() {
    if (this.size > 0) {
      this.size--;
      return this.queue.shift();
    }
    return this.queue.shift();
  }
}

export class InMemoryQueue extends BaseQueue {
  queue = new Queue<Job>();
  constructor(queueParams: QueueParams) {
    super(queueParams);
  }
  add(job:Job): void {
    this.queue.add(job);
    this.emit("job added");
  }
  remove() {
    return this.queue.remove();
  }
  size(): number {
    return this.queue.size;
  }
}
