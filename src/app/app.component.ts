import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkerService } from './worker.service';
import {DataItem} from "./types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  tableData: DataItem[] = []

  constructor(
    private workerService: WorkerService
  ) {}
  ngOnInit() {

    this.workerService.getDataEmitter().subscribe((result) => {
      this.tableData = result;
    });
  }

  ngOnDestroy() {
    this.workerService.terminateWorker();
  }
}
