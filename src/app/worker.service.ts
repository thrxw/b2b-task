import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { Data } from './data.model';
import { DISPLAY_ITEM_SIZE } from "./constants";

@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  private worker: Worker;
  private dataEmitter = new Subject<any[]>();
  private additionalIds: string[] = []

  constructor() {
    this.worker = new Worker(new URL('./app.worker', import.meta.url));
    this.worker.addEventListener('message', ({ data }) => {
      let displayDataSize = data.length > DISPLAY_ITEM_SIZE ? DISPLAY_ITEM_SIZE : data.length;
      let newData = [];

      for (let i = 0; i < displayDataSize; i++) {
        let item = this.additionalIds[i] ? {
          ...data.pop(),
          id: this.additionalIds[i]
        } : data.pop();
        newData.push(new Data(item));
      }

      this.dataEmitter.next(newData);
    });
  }

  getDataEmitter() {
    return this.dataEmitter.asObservable();
  }

  postMessage(message: any) {
    this.worker.postMessage(message);
  }

  setIds(ids: string) {
    this.additionalIds = ids.length ? ids.split(/\s*,\s*/) : [];
  }

  terminateWorker() {
    this.worker.terminate();
  }
}
