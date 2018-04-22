import { Component, OnInit, NgZone, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DashboardService } from 'app/_services/dashboard.service';
import { IEmployee } from 'app/models/employee';
import { ITask } from 'app/models/task';
import { ITaskColumn } from 'app/models/taskcolumn';
import 'rxjs/add/operator/skip';
import { SocketService } from '../../_services/socket.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, OnDestroy {
  mode = 'over';
  initializeSubscription;
  currentArea;
  filterSubscription;
  showSideBar = false;
  showActionBar = false;
  @Output() loaderEvent = new EventEmitter();
  socketConnection;
  employees: IEmployee[]; filteredEmployees: IEmployee[];
  tasks: ITask[]; filteredTasks: ITask[];
  allTaskColumns = []; taskColumnConfig = [];
  columnConfig: ITaskColumn[];
  employeeColumnConfig = []; filteredEmployeeColumnConfig = [];

  constructor(private dashboardService: DashboardService, private socketService: SocketService, private ngZone: NgZone) {
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
        () => this.filterEmployees(true));
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
    this.socketEvents();
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
        () => {
          this.tasks.map(task => this.convertDateTime(task));
          this.filterEmployees(true);
        });
  }


  filterEmployees(filterColumns) {
    this.currentArea = this.dashboardService.currentArea;
    this.filteredEmployees = this.employees.filter(
      employee => employee.functionalAreaId === this.currentArea
    );
    if (filterColumns) {
      this.resetSelections();
      this.filterColumns();
    }
  }



  filterColumns() {
    this.columnConfig = [];
    const filteredTaskColumns = this.taskColumnConfig.filter(
      column => column.functionalAreaId === this.currentArea
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
      console.log(this.employeeColumnConfig);
      this.filteredEmployeeColumnConfig = this.employeeColumnConfig.filter(
        column => column.functionalAreaID === this.currentArea || column.functionalAreaID === -1
      );
       this.filterTasks();
  }

  filterTasks() {
    this.filteredTasks = this.tasks.filter(
      task => task.tskArea === this.currentArea
    );
    this.loaderEvent.emit(false);
  }

  convertDateTime(task) {
      task.scheduleDate =  this.getDateTime(task.scheduleDate);
      task.dispatchNeeded = this.getDateTime(task.dispatchNeeded);
      task.responseNeeded = this.getDateTime(task.responseNeeded);
      task.completeNeededUTC = task.completeNeeded;
      task.completeNeeded = this.getDateTime(task.completeNeeded);
      task.requestDate = this.getDateTime(task.requestDate);
  }

  getDateTime(date): String {
    const d = new Date(date);
     date = d.getHours() + ':' + d.getMinutes() + ' ' + d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
     return date;
   }


  changeEmployeeStatus(employee) {
    const index = this.employees.findIndex(emp => emp.employeeId === employee.employeeId);
    this.employees.splice(index, 1);
    this.employees.push(employee);
    if (employee.functionalAreaId === this.currentArea) {
      this.filterEmployees(false);
    }
  }

  changeTaskStatus(task) {
    let index = -1;
    index = this.tasks.findIndex(tsk => tsk.taskNumber === task.taskNumber);
    if (index !== -1) {
    this.tasks.splice(index, 1);
    } else {
      this.convertDateTime(task);
    }
    this.tasks.push(task);
    if (task.tskArea === this.currentArea) {
      this.filterTasks();
    }
  }

  assignTask(event) {
    this.changeEmployeeStatus(event.employee);
    this.changeTaskStatus(event.task);
  }

  unassignEmployee(employeeName) {
    const employee = this.filteredEmployees.find(emp => emp.brief === employeeName);
    employee.empStatusType = 1;
    this.changeEmployeeStatus(employee);
  }

  changeTaskStatusFromEmployee(employee) {
    const task = this.filteredTasks.find(tsk => {
      const status = tsk.tskStatusType;
      if (status === 2 || status === 3 || status === 4 ) {
       return tsk.assignedPersonnel === employee.brief;
      }
     });
    console.log(task);
    if (employee.empStatusType === 1) {
      task.tskStatusType = 5;
    } else {
      task.tskStatusType = employee.empStatusType;
    }
    this.changeTaskStatus(task);
  }

  toggleSideBar() {
    this.showSideBar = !this.showSideBar;
  }

  setActionBar(value) {
    this.ngZone.run(() => {
      this.showActionBar = value;
    });
  }

  socketEvents() {
    if (this.socketService.hubConnection) {
    this.socketConnection = this.socketService.hubConnection;
    this.socketConnection.on('TaskChange', (msg) => {
      this.changeTaskStatus(msg);
    });
    this.socketConnection.on('BroadcastMessage', (msg) => {
      this.changeEmployeeStatus(msg);
    });
  }
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
    this.dashboardService.uncheckEmployees.next();
    this.dashboardService.uncheckTasks.next();
  }

}
