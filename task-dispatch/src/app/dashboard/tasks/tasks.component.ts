import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../_services/dashboard.service';
import { ITask } from './task';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  activeTab = 1;
  tasks: ITask[] = [];
  temp: ITask[];
  rows: ITask[];
  filter = '';
  showEdit = false;
  showSelectAll;
  columns = [   {name: 'Site Name', prop: 'SiteName', show: true},
                {name: 'Task Area', prop: 'TskArea', show: true},
                {name: 'Area Brief', prop: 'AreaBrief', show: true},
                {name: 'Class Brief', prop: 'ClassBrief', show: true},
                {name: 'Start Brief', prop: 'StartBrief', show: true},
                {name: 'Dest Brief', prop: 'DestBrief', show: true},
                {name: 'Mode Brief', prop: 'ModeBrief', show: true},
                {name: 'Cost Brief', prop: 'CostBrief', show: true},
                {name: 'Task Number', prop: 'TaskNumber', show: true},
                {name: 'Tran Task Number', prop: 'TranTaskNumber', show: true},
                {name: 'Item', prop: 'Item', show: true},
                {name: 'Schedule Date', prop: 'ScheduleDate', show: true},
                {name: 'Dispatch Needed', prop: 'DispatchNeeded', show: true},
                {name: 'Response Needed', prop: 'ResponseNeeded', show: true},
                {name: 'Complete Needed', prop: 'CompleteNeeded', show: true},
                {name: 'Request Date', prop: 'RequestDate', show: true},
                {name: 'Assigned Date', prop: 'AssignedDate', show: true},
                {name: 'Active Date', prop: 'ActiveDate', show: true},
                {name: 'Delay Date', prop: 'DelayDate', show: true},
                {name: 'Close Date', prop: 'CloseDate', show: true},
                {name: 'Cancel Date', prop: 'CancelDate', show: true},
                {name: 'Task Type Brief', prop: 'TskTaskTypeBrief', show: true},
                {name: 'Notes', prop: 'Notes', show: true},
                {name: 'Active Date', prop: 'ActiveDate', show: true},
                {name: 'Isolation Patient', prop: 'IsolationPatient', show: true},
                {name: 'Isolation Patient Brief', prop: 'IsolationPatientBrief', show: true},
                {name: 'Priority', prop: 'Priority', show: true},
                {name: 'Custom Field1', prop: 'CustomField1', show: true},
                {name: 'Custom Field2', prop: 'CustomField2', show: true},
                {name: 'Custom Field3', prop: 'CustomField3', show: true},
                {name: 'Custom Field4', prop: 'CustomField4', show: true},
                {name: 'Custom Field5', prop: 'CustomField5', show: true},
                {name: 'Assigned Personnel', prop: 'AssignedPersonel', show: true},
                {name: 'Requestor Name', prop: 'RequestorName', show: true},
                {name: 'Requestor Phone', prop: 'RequestorPhone', show: true},
                {name: 'Requestor Email', prop: 'RequestorEmail', show: true},
                {name: 'Patient Name', prop: 'PatientName', show: true},
                {name: 'Patient DOB', prop: 'PatientDOB', show: true},
                {name: 'Task Request', prop: 'TaskRequest', show: true},
                {name: 'Entered By', prop: 'EnteredBy', show: true},
                {name: 'Entered At', prop: 'EnteredAt', show: true},
                {name: 'Modified By', prop: 'ModifiedBy', show: true},
                {name: 'Modified At', prop: 'ModifiedAt', show: true},
              ];
  selected = [];
  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
  this.dashboardService.componentMethodCalled$.subscribe(
      () =>  this.getData());
  }

  getData() {
    this.tasks = [];
    this.dashboardService.getTaskList().subscribe(
      task =>  task['data'].map(value => this.tasks.push(value)) ,
      error => console.log(error),
        () =>  this.initialize());
  }


  initialize() {
      this.temp = this.tasks.filter(function(d) {
              return d.TskStatusType === 1;
            });
            this.rows = this.temp;
            this.checkSelectAll();
  }


  changeTab(tab): void {
      this.activeTab = tab;
      this.temp = this.tasks.filter(function(d) {
        return d.TskStatusType === tab;
      });
      this.rows = this.temp;
  }



  getRowClass(row: ITask) {
    const date = new Date();
    const taskDate = new Date(row.CompleteNeeded);
    const timeDiff = Math.ceil((taskDate.getTime() - date.getTime()) / (1000 * 60) );
     return {
       'exceeded': (timeDiff < 0),
       'approaching': (timeDiff > 0 && timeDiff < 10)
     };
  }

  getCellClass({ row, column, value }): any {
    return {
      'st': value === 'ST',
      'sc': value === 'SC'
    };
  }

  updateFilter() {
     const val = this.filter.toLowerCase();
     if (val !== '') {
    const colsAmt = this.columns.length;
    const keys = this.columns.map(function(col) {
        if (col.show) {
          return col.prop;
        }
    });
    this.rows = this.temp.filter(function(item) {
      let searchStr = '';
      for (let i = 0; i < colsAmt; i++) {
        if (item[keys[i]]) {
        searchStr += (item[keys[i]]).toString().toLowerCase();
        }
      }
      return searchStr.indexOf(val) !== -1 || !val;
    });
  } else {
      this.rows = this.temp;
  }
  }

  clearFilter() {
    this.filter = '';
    this.rows = this.temp;
  }

  saveEdit() {
      this.showEdit = false;
  }

  cancelEdit() {
    this.showEdit = false;
  }

  toggleSelectAll() {
    this.columns.map(col => col.show = this.showSelectAll);
    this.showSelectAll = ! this.showSelectAll;
  }

    checkSelectAll() {
      if (this.columns.every(col => col.show === true)) {
        this.showSelectAll = false;
    } else {
      this.showSelectAll = true;
    }
    }





  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    console.log('Select Event', this.selected);
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
