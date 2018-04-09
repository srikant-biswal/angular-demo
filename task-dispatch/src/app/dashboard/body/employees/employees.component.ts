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
  modalReference;
  selectedEmployee: IEmployee;
  @Input() employees: IEmployee[];
  @Input() filteredColumnConfig;
  @ViewChild('unsignedEmployeesModal') unsignedEmployeesModal;
  @ViewChild('delayEmployeeModal') delayEmployeeModal;
  @Output() changeStatusEvent = new EventEmitter();
  unsignedEmployeesSubscription;
  taskDelayList;
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
  }

  ngOnChanges() {
   this.filterEmployees();
  }

  ngOnDestroy() {
    this.unsignedEmployeesSubscription.unsubscribe();
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
          this.delayed.push(employee);
          break;
          case 4:
          this.active.push(employee);
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
  }
  }

  filterColumns() {
    console.log(this.filteredColumnConfig);
  }


  showUnsignedEmployees(content) {
    this.selectedEmployee = null;
    this.modalReference = this.modalService.open(content);
  }


  changeStatus(event) {
    console.log(event);
    if (event.newStatus === 3) {
      console.log(this.taskDelayList);
      this.modalReference = this.modalService.open(this.delayEmployeeModal);
      this.selectedEmployee = event.employee;
    } else {
      event.employee.empStatusType = event.newStatus;
      this.changeStatusEvent.emit(event.employee);
    }
  }

  delayEmployee() {
    this.selectedEmployee.empStatusType = 3;
    this.changeStatusEvent.emit(this.selectedEmployee);
    this.closeModal();
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

}
