import { EventEmitter } from "events";
import { Job } from "../types/Job";


export class WorkerController extends EventEmitter {
  private active_workers: number;
  constructor(private max_workers: number) {
    super();
    this.active_workers = 0;
    this.on("task completed",()=>{
        this.active_workers --;
    })
  }

  spawnWorker(job: Job) {
    if (this.areWorkersAvailable()) {
      (async (evt:EventEmitter) => {
        await mockWorkerFunction(job);
        this.emit("task completed");
      })(this);
      this.active_workers++;
    }
  }

  areWorkersAvailable(): boolean {
    return this.active_workers < this.max_workers;
  }
}

const mockWorkerFunction = async (job: Job) => {
  if (!job) return;
  console.log(job.id + "started");
  await setTimeout(() => console.log(job.id + "in progress"), 5000);
  console.log(job.data + "completed");
};
