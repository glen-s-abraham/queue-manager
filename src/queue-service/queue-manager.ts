import { v4 as uuidv4 } from "uuid";
import { Job } from "../types/Job";
import { BaseQueue, QueueParams } from "./base-queue";
import { InMemoryQueue } from "./inmemory-queue";
import { WorkerController } from "./worker-controller";

export class QueueManager {
  private queue: BaseQueue;
  private workerController: WorkerController;
  constructor(private queueParams: QueueParams) {
    this.queue = new InMemoryQueue(queueParams);
    this.workerController = new WorkerController(
      this.queueParams.max_workers || 1
    );
    this.startScheduler();
  }
  add(data: any) {
    const job = this.generateJob(data);
    this.queue.add(job);
  }
  private generateJob(data: any) {
    const job: Job = {
      id: uuidv4(),
      data: data,
      createdAt: new Date(),
    };
    return job;
  }

  private startScheduler(){
      setInterval(()=>{
        console.log('queue size:'+this.queue.size());
        console.log('worker availability:'+this.workerController.areWorkersAvailable());
        if (this.workerController.areWorkersAvailable() && this.queue.size() > 0) {
            this.workerController.spawnWorker(this.queue.remove()!);
        }
      },1000)
  }
}
