import { Component, Input } from '@angular/core';
import { DataItem } from "../types";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() dataSource!: DataItem[];
  displayedColumns: string[] = ['id', 'int', 'float', 'color', 'child'];
  getNestedTableData(child: DataItem['child']): DataItem['child'][] {
    return [{ id: child.id, color: child.color }]
  }
}
