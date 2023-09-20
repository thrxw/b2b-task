import { Component } from '@angular/core';
import { WorkerService } from '../worker.service';
import { SIZE, WORKER_EVENTS } from "../constants";

@Component({
  selector: 'array-size',
  templateUrl: './array-size.component.html',
  styleUrls: ['./array-size.component.css']
})
export class ArraySizeComponent {
  size = SIZE;

  constructor(
    private workerService: WorkerService
  ) {}

  onSizeChange() {
    this.workerService.postMessage({
      action: WORKER_EVENTS.SET_SIZE,
      value: this.size
    });
  }
}
