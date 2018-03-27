import { Component, OnInit, ViewEncapsulation, Input, NgZone, Output, EventEmitter, OnChanges, AfterViewInit } from '@angular/core';
import {IEmployee} from 'app/models/employee';


@Component({
  selector: 'app-employeestatus',
  templateUrl: './employeestatus.component.html',
  styleUrls: ['./employeestatus.component.css'],
})
export class EmployeestatusComponent implements OnChanges {
  @Input() title;
  ready = false;
  @Input() _rows: IEmployee[] = [];
  @Output() childEvent = new EventEmitter();
  rows: IEmployee[] = [];
  contextMenu = false;
  contextMenuRow;
  x; y;
  showEdit = false;
  columns =    [{name: 'Name', prop: 'Brief' , show: true},
                {name: 'Min', prop: 'DiffMinute', show: true},
                {name: 'Location', prop: 'Location', show: true},
                {name: 'Zone', prop: 'ZoneBrief', show: true}];
  selected = [];

  constructor(private ngZone: NgZone) { }

  ngOnChanges() {
      if (this._rows) {
        this.rows = this._rows;
      }
  }



  saveEdit(): void {
    this.showEdit = false;
  }


  cancelEdit(): void {
    this.showEdit = false;
  }

  getRowClass(row) {
    // return {
    //   'exceeded': (row.threshold === 'exceeded'),
    //   'approaching': (row.threshold === 'approaching')
    // };
  }

  getCellClass({ row, column, value }): any {
    return {
      'st': value === 'ST',
      'sc': value === 'SC'
    };
  }

  onTableContextMenu(context) {
    if (context.type === 'body') {
    this.x = context.event.x - 5 ;
    this.y = context.event.y - 5;
    this.contextMenuRow = context.content;
    this.ngZone.run(() => {
      this.contextMenu = true;
    });
    context.event.preventDefault();
    context.event.stopPropagation();
  }
  }

  changeStatus(status) {
    console.log(status);
    this.contextMenu = false;
    this.contextMenuRow.EmpStatusType = status;
    this.childEvent.emit(this.contextMenuRow);
  }


  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    console.log(this.selected);
  }

  add() {
    this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    this.selected = [ this.rows[1], this.rows[3] ];
  }

  remove() {
    this.selected = [];
  }

}
