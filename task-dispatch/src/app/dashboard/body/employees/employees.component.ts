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
  selected: IEmployee[];
  selectedEmployee: IEmployee;
  @Input() employees: IEmployee[];
  @ViewChild('modal') modal;
  @Output() changeStatusEvent = new EventEmitter();
  unsignedEmployeesSubscription;
  available: IEmployee[]; assigned: IEmployee[]; delayed: IEmployee[];
  active: IEmployee[]; onbreak: IEmployee[]; atlunch: IEmployee[]; unsigned: IEmployee[];
  constructor(private dashboardService: DashboardService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.unsignedEmployeesSubscription = this.dashboardService.unsignedEmployees.subscribe (
      () => this.showUnsignedEmployees(this.modal)
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

  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  showUnsignedEmployees(content) {
    this.selectedEmployee = null;
    this.modalReference = this.modalService.open(content);
  }


  changeStatus(employee) {
    this.changeStatusEvent.emit(employee);
  }

  selectEmployee(employee) {
    this.selectedEmployee = employee;
  }

  signInEmployee() {
    if (this.selectedEmployee) {
    this.selectedEmployee.empStatusType = 1;
    this.changeStatus(this.selectedEmployee);
    this.closeModal();
    }
  }

  closeModal() {
    this.selectedEmployee = null;
    this.modalReference.close();
  }


}
