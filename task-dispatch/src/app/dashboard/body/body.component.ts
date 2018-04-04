import { Component, OnInit, NgZone, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DashboardService } from 'app/_services/dashboard.service';
import { IEmployee } from 'app/models/employee';
import { ITask } from 'app/models/task';
import { ITaskColumn } from 'app/models/taskcolumn';
import { ITaskColumnDb } from 'app/models/taskcolumndb';
import 'rxjs/add/operator/skip';
import { TemplateParseError } from '@angular/compiler';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, OnDestroy {
  mode = 'over';
  initializeSubscription;
  filterSubscription;
  showSideBar = false;
  showActionBar = false;
  @Output() loaderEvent = new EventEmitter();
  employees: IEmployee[]; filteredEmployees: IEmployee[];
  tasks: ITask[]; filteredTasks: ITask[];
  allTaskColumns = []; taskColumnConfig = []; columnConfig: ITaskColumn[];
  employeeColumnConfig = []; filteredEmployeeColumnConfig = [];

  constructor(private dashboardService: DashboardService, private ngZone: NgZone) {
    if (window.screen.width > 1100) {
      this.mode = 'push';
    }
   }

  ngOnInit() {
      this.getTaskColumnConfig();
     this.initializeSubscription =  this.dashboardService.initializeData.subscribe(
        () => this.getEmployees()
      );
     this.filterSubscription =  this.dashboardService.filterData.subscribe(
        () => this.filterEmployees(true)
      );
  }

  ngOnDestroy() {
    this.initializeSubscription.unsubscribe();
    this.filterSubscription.unsubscribe();
  }


  getTaskColumnConfig() {
    this.dashboardService.getTaskColumnConfig().subscribe(
      column => column.map( value => {
        if (value.functionalAreaId === -1) {
          this.allTaskColumns.push(value);
        } else {
          this.taskColumnConfig.push(value);
        }
      }),
      error => this.handleError(error),
      () => this.getEmployeeColumnConfig()
    );
}

  getEmployeeColumnConfig() {
    this.employeeColumnConfig = [];
    this.dashboardService.getEmployeeColumnConfig().subscribe(
      column => column.map(value => this.employeeColumnConfig.push(value)),
      error => this.handleError(error),
    );
  }

  getEmployees() {
    this.loaderEvent.emit(true);
    this.showSideBar = false;
    this.employees = [];
    this.dashboardService.getEmployeeList().subscribe(
        employees => this.employees = employees,
        error => console.log(error),
        () => this.getTasks()
    );
  }

  getTasks() {
    this.tasks = [];
    this.dashboardService.getTaskList().subscribe(
        tasks => this.tasks = tasks,
        error => console.log(error),
        () => this.filterEmployees(true));
  }


  filterEmployees(filterColumns) {
    const areaId = this.dashboardService.currentArea;
    console.log(areaId);
    this.filteredEmployees = this.employees.filter(
      employee => employee.functionalAreaId === areaId
    );
    if (filterColumns) {
      this.resetSelections();
      this.filterColumns(areaId);
    }
  }

  filterColumns(areaId) {
    this.columnConfig = [];
    const filteredTaskColumns = this.taskColumnConfig.filter(
      column => column.functionalAreaId === areaId
    );
    let flag;
     for (let i = 1; i < 7; i++) {
        const temp = filteredTaskColumns.filter(value => value.taskStatusTypeId === i);
        for (let j = 0; j < this.allTaskColumns.length ; j++) {
        flag = true;
        for (let k = 0; k < temp.length; k++) {
            if (this.allTaskColumns[j].header === temp[k].header) {
                flag = false;
                 this.columnConfig.push({'name': temp[k].header, 'prop': temp[k].attrName, 'show': true,
                                             'statusType': i, 'displayOrder': temp[k].displayOrder});
                  }
            }
            if (flag) {
                this.columnConfig.push({'name': this.allTaskColumns[j].header, 'prop': this.allTaskColumns[j].attrName,
                                           'show': false, 'statusType': i, 'displayOrder': 99});
                }
              }
          }
      this.filteredEmployeeColumnConfig = this.employeeColumnConfig.filter(
        column => column.functionalAreaId === areaId
      );
      this.filterTasks(areaId);
  }

  filterTasks(areaId) {
    this.filteredTasks = this.tasks.filter(
      task => task.tskArea === areaId
    );
    this.convertDateTime();
    this.loaderEvent.emit(false);
  }

  convertDateTime() {
    this.filteredTasks.map( task => {
      task.scheduleDate =  this.getDateTime(task.scheduleDate);
      task.dispatchNeeded = this.getDateTime(task.dispatchNeeded);
      task.responseNeeded = this.getDateTime(task.responseNeeded);
      task.completeNeededUTC = task.completeNeeded;
      task.completeNeeded = this.getDateTime(task.completeNeeded);
      task.requestDate = this.getDateTime(task.requestDate);
    });
  }

  getDateTime(date): String {
   const d = new Date(date);
    date = d.getHours() + ':' + d.getMinutes() + ' ' + d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
   return date;
  }

  changeStatus(employee) {
    const index = this.employees.findIndex(emp => emp.employeeId === employee.employeeId);
    this.employees.splice(index, 1);
    this.employees.push(employee);
    this.filterEmployees(false);
  }

  toggleSideBar() {
    this.showSideBar = !this.showSideBar;
  }

  setActionBar(value) {
    this.ngZone.run(() => {
      this.showActionBar = value;
    });
  }

  handleError(error) {
    if (error.status === 401) {
      console.log('Error');
    }
    console.log(error);
  }


  resetSelections() {
    this.dashboardService.selected = [];
    this.dashboardService.actionBar.next();
    this.dashboardService.uncheck.next();
  }

}
