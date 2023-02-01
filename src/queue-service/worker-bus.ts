import { Job } from "../types/Job";

export class WorkerBus {
  workers = new Map<string,Function>();
  registerWorker(queueName:string,worker:Function){
      this.workers.set(queueName,worker);
  }
  async handle(queueName:string,job:Job) {
    const handler = this.workers.get(queueName);
    if (!handler) {
      throw new Error(`No handler registered for command: ${queueName}`);
    }
    return handler(job);
  }
}
