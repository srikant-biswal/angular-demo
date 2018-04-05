import { Component, OnInit, ViewEncapsulation, Input, NgZone, Output,
         EventEmitter, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';
import {IEmployee} from 'app/models/employee';
import { DashboardService } from 'app/_services/dashboard.service';


@Component({
  selector: 'app-employeestatus',
  templateUrl: './employeestatus.component.html',
  styleUrls: ['./employeestatus.component.css'],
})
export class EmployeestatusComponent implements OnInit, OnChanges , OnDestroy {
  @Input() title;
  ready = false;
  @Input() _rows: IEmployee[] = [];
  @Output() changeStatusEvent = new EventEmitter();
  rows: IEmployee[] = [];
  uncheckSubscription;
  contextMenu = false;
  contextMenuRow;
  x; y;
  showEdit = false;
  columns =    [{name: 'Min', prop: 'diffMinute', show: true},
                {name: 'Location', prop: 'location', show: true},
                {name: 'Zone', prop: 'zoneBrief', show: true}];
  selected = [];

  constructor(private ngZone: NgZone, private dashBoardService: DashboardService) { }

  ngOnInit() {
    this.uncheckSubscription = this.dashBoardService.uncheck.subscribe(
      () => this.remove()
    );
  }

  ngOnChanges() {
      if (this._rows) {
        this.rows = this._rows;
      }
  }

  ngOnDestroy() {
    this.uncheckSubscription.unsubscribe();
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
    this.changeStatusEvent.emit(this.contextMenuRow);
  }


  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    switch (this.title) {
      case 'Available':
      this.dashBoardService.selected[1] = selected;
      break;
      case 'Assigned':
      this.dashBoardService.selected[2] = selected;
      break;
      case 'Delayed':
      this.dashBoardService.selected[3] = selected;
      break;
      case 'Active':
      this.dashBoardService.selected[4] = selected;
      break;
      case 'On Break':
      this.dashBoardService.selected[5] = selected;
      break;
      case 'At Lunch':
      this.dashBoardService.selected[6] = selected;
      break;
      default:
      console.log('Undefined');
    }
    this.dashBoardService.actionBar.next();
  }


  remove() {
    this.selected = [];
  }

}
