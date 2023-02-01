import { EventEmitter } from "events";
import { Job } from "../types/Job";


export interface QueueParams{
  name: string;
  max_size?: number;
  max_workers?: number;
}

export abstract class BaseQueue extends EventEmitter{
  constructor(protected queueParams: QueueParams) {
      super();
  }
  abstract add(job: Job): void;
  abstract remove(): Job | undefined;
  abstract size():number;
}
