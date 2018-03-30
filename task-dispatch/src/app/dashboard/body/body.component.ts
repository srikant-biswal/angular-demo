import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { DashboardService } from 'app/_services/dashboard.service';
import { IEmployee } from 'app/models/employee';
import { ITask } from 'app/models/task';
import { ITaskColumn } from 'app/models/taskcolumn';
import { ITaskColumnDb } from 'app/models/taskcolumndb';
import 'rxjs/add/operator/skip';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  showLoader;
  mode = 'over';
  showSideBar = false;
  showActionBar = false;
  employees: IEmployee[]; filteredEmployees: IEmployee[];
  tasks: ITask[]; filteredTasks: ITask[];
  allTaskColumns = []; taskColumnConfig = []; columnConfig: ITaskColumn[];

  constructor(private dashboardService: DashboardService, private ngZone: NgZone) {
    if (window.screen.width > 1100) {
      this.mode = 'push';
    }
   }

  ngOnInit() {
      this.getTaskColumnConfig();
      this.dashboardService.initializeData.unsubscribe();
      this.dashboardService.initializeData.subscribe(
        () => this.getEmployees()
      );
      this.dashboardService.filterData$.subscribe(
        () => this.filterEmployees(true)
      );
  }


  getTaskColumnConfig() {
    this.dashboardService.getTaskColumnConfig().subscribe(
      column => column.map( value => {
        if (value.FunctionalAreaId === -1) {
          this.allTaskColumns.push(value);
        } else {
          this.taskColumnConfig.push(value);
        }
      }),
      error => this.handleError(error)
    );
}

  getEmployees() {
    this.showLoader = true;
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
      employee => employee.FunctionalAreaId === areaId
    );
    if (filterColumns) {
      this.resetSelections();
      this.filterColumns(areaId);
    }
  }

  filterColumns(areaId) {
    this.columnConfig = [];
    const filteredTaskColumns = this.taskColumnConfig.filter(
      column => column.FunctionalAreaId === areaId
    );
    let flag;
     for (let i = 1; i < 7; i++) {
        const temp = filteredTaskColumns.filter(value => value.TaskStatusTypeId === i);
        for (let j = 0; j < this.allTaskColumns.length ; j++) {
        flag = true;
        for (let k = 0; k < temp.length; k++) {
            if (this.allTaskColumns[j].Header === temp[k].Header) {
                flag = false;
                 this.columnConfig.push({'name': temp[k].Header, 'prop': temp[k].AttrName, 'show': true,
                                             'statusType': i, 'displayOrder': temp[k].DisplayOrder});
                  }
            }
            if (flag) {
                this.columnConfig.push({'name': this.allTaskColumns[j].Header, 'prop': this.allTaskColumns[j].AttrName,
                                           'show': false, 'statusType': i, 'displayOrder': 99});
                }
              }
          }
      this.filterTasks(areaId);
  }

  filterTasks(areaId) {
    this.filteredTasks = this.tasks.filter(
      task => task.TskArea === areaId
    );
    this.showLoader = false;
  }

  changeStatus(employee) {
    const index = this.employees.findIndex(emp => emp.EmployeeId === employee.EmployeeId);
    this.employees.splice(index, 1);
    this.employees.push(employee);
    this.filterEmployees(false);
  }

  toggleSideBar() {
    this.showSideBar = !this.showSideBar;
  }

  toggleActionBar(value) {
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
    this.toggleActionBar(false);
    this.dashboardService.selected = [];
    this.dashboardService.uncheck.next();
  }

}
