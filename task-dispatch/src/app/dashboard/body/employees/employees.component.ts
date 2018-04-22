import { Component, OnInit, Input, OnChanges, EventEmitter, Output, OnDestroy, ViewChild } from '@angular/core';
import { DashboardService } from 'app/_services/dashboard.service';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { IEmployee } from 'app/models/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnChanges, OnInit, OnDestroy {
  initialSort;
  modalReference;
  selectedEmployee: IEmployee;
  @Input() employees: IEmployee[];
  @Input() filteredColumnConfig;
  @ViewChild('unsignedEmployeesModal') unsignedEmployeesModal;
  @ViewChild('delayEmployeeModal') delayEmployeeModal;
  @Output() changeEmployeeStatusEvent = new EventEmitter();
  @Output() changeTaskStatusEvent  = new EventEmitter();
  unsignedEmployeesSubscription;
  changeEmployeeStatusSubscription;
  taskDelayList;
  generatedColumnConfig;
  delayReason;
  available: IEmployee[]; assigned: IEmployee[]; delayed: IEmployee[];
  active: IEmployee[]; onbreak: IEmployee[]; atlunch: IEmployee[]; unsigned: IEmployee[];

  constructor(private dashboardService: DashboardService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.dashboardService.getTaskDelayList().subscribe(
      taskDelay => this.taskDelayList = taskDelay,
      error => console.log(error),
      () => this.delayReason = this.taskDelayList[0].taskDelayTypeId
    );
    this.unsignedEmployeesSubscription = this.dashboardService.unsignedEmployees.subscribe (
      () => this.showUnsignedEmployees(this.unsignedEmployeesModal)
    );
    this.changeEmployeeStatusSubscription = this.dashboardService.changeEmployeeStatus.subscribe (
      value =>  this.changeStatus(value)
    );
  }

  ngOnChanges() {
   this.filterEmployees();
  }

  ngOnDestroy() {
    this.unsignedEmployeesSubscription.unsubscribe();
    this.changeEmployeeStatusSubscription.unsubscribe();
  }


  filterEmployees() {
    if (this.employees) {
    console.log(this.employees);
    this.available = []; this.assigned = []; this.delayed = []; this.active = [];
    this.onbreak = []; this.atlunch = []; this.unsigned = [];
    this.employees.map(
      employee => {
        switch (employee.empStatusType) {
          case 1:
          this.available.push(employee);
          break;
          case 2:
          this.assigned.push(employee);
          break;
          case 3:
          this.active.push(employee);
          break;
          case 4:
          this.delayed.push(employee);
          break;
          case 5:
          this.onbreak.push(employee);
          break;
          case 6:
          this.atlunch.push(employee);
          break;
          case 7:
          this.unsigned.push(employee);
          break;
          default:
          console.log('Undefined');
        }
      }
    );
    this.filterColumns();
  }
  }

  filterColumns() {
    this.generatedColumnConfig = [];
    const allColumns = [];
    const config = [];
    this.filteredColumnConfig.filter(col => {
    if (col.FunctionalAreaId === -1) {
      allColumns.push(col);
    } else {
      config.push(col);
      if (col.sortBy === 1) {
        this.initialSort = {prop: col.attrName, dir: 'asc'};
      }
    }
    });
    for (let i = 0; i < allColumns.length; i++ ) {
      let flag = true;
      for (let j = 0; j < config.length ; j++) {
            if (allColumns[i].header === config[j].header) {
              flag = false;
              this.generatedColumnConfig.push({'name': config[j].header, 'prop': config[j].attrName,
                                              'show': true , 'displayOrder': config[j].displayOrder});
            }
            if (flag) {
              this.generatedColumnConfig.push({'name': allColumns[i].header, 'prop': allColumns[i].attrName,
                                              'show': false , 'displayOrder': 99});
            }
      }
    }

  }


  showUnsignedEmployees(content) {
    this.selectedEmployee = null;
    this.modalReference = this.modalService.open(content);
  }


  changeStatus(event) {
    if (event.newStatus === 4) {
      this.modalReference = this.modalService.open(this.delayEmployeeModal);
      this.selectedEmployee = event.employee;
    } else {
      event.employee.empStatusType = event.newStatus;
      if (event.employee.empStatusType !== 5 && event.employee.empStatusType !== 6) {
        this.changeTaskStatusEvent.emit(event.employee);
      }
      this.changeEmployeeStatusEvent.emit(event.employee);
    }
  }

  delayEmployee() {
    this.selectedEmployee.empStatusType = 4;
    this.changeTaskStatusEvent.emit(this.selectedEmployee);
    this.changeEmployeeStatusEvent.emit(this.selectedEmployee);
    this.closeModal();
    this.resetSelections();
  }

  selectEmployee(employee) {
    this.selectedEmployee = employee;
  }

  signInEmployee() {
    if (this.selectedEmployee) {
    this.changeStatus({employee: this.selectedEmployee, newStatus: 1});
    this.closeModal();
    }
  }

  closeModal() {
    this.selectedEmployee = null;
     this.modalReference.close();
  }

  resetSelections() {
    this.dashboardService.selected = [];
    this.dashboardService.actionBar.next();
  }

}
