import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { Data } from './data.model';
import { DISPLAY_ITEM_SIZE, WORKER_EVENTS } from "./constants";
import {DataItem} from "./types";

interface PostMessage {
  action: typeof WORKER_EVENTS[keyof typeof WORKER_EVENTS],
  value: number
}
@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  private worker: Worker;
  private dataEmitter = new Subject<DataItem[]>();
  private additionalIds: string[] = [];
  private isProcessing = false;

  constructor() {
    this.worker = new Worker(new URL('./app.worker', import.meta.url));
    this.worker.addEventListener('message', ({ data }) => {
      if (!this.isProcessing) {
        this.isProcessing = true;

        setTimeout(() => {
          this.isProcessing = false; // used to stop rerender more often than 100ms
        }, 100);

        let displayDataSize = data.length > DISPLAY_ITEM_SIZE ? DISPLAY_ITEM_SIZE : data.length;
        let newData: DataItem[] = [];

        for (let i = 0; i < displayDataSize; i++) {
          let item = this.additionalIds[i] ? {
            ...data.pop(),
            id: this.additionalIds[i]
          } : data.pop();
          newData.push(new Data(item));
        }

        this.dataEmitter.next(newData);
      }
    });
  }

  getDataEmitter() {
    return this.dataEmitter.asObservable();
  }

  postMessage(message: PostMessage) {
    this.worker.postMessage(message);
  }

  setIds(ids: string) {
    this.additionalIds = ids.length ? ids.split(/\s*,\s*/) : [];
  }

  terminateWorker() {
    this.worker.terminate();
  }
}
