import { Component } from '@angular/core';
import { WorkerService } from '../worker.service';
import { TIMER, WORKER_EVENTS } from "../constants";

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
  timer = TIMER;

  constructor(
    private workerService: WorkerService,
  ) {}

  onTimerChange() {
    this.workerService.postMessage({
      action: WORKER_EVENTS.SET_INTERVAL,
      value: this.timer
    });
  }
}
