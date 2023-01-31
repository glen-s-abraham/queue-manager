import { v4 as uuidv4 } from "uuid";
import { Job } from "../types/Job";

export interface QueueParams {
  name: string;
  max_size?: number;
  max_workers?: number;
}


export abstract class BaseQueue{
  constructor(private queueParams: QueueParams) {}
  generateJob(data: any) {
    const job: Job = {
      id: uuidv4(),
      data: data,
      createdAt: new Date(),
    };
    return job;
  }
  abstract add(data: any): void;
  abstract remove():Job|undefined;
  abstract subscribe(name: string, fn: Function): void;

}
