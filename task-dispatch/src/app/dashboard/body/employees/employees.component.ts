import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { DashboardService } from 'app/_services/dashboard.service';
import { IEmployee } from 'app/models/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnChanges, OnInit {
  employee;
  @Input() employees: IEmployee[];
  @Output() childEvent = new EventEmitter();
  available: IEmployee[]; assigned: IEmployee[]; delayed: IEmployee[];
  active: IEmployee[]; onbreak: IEmployee[]; atlunch: IEmployee[];
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
  }

  ngOnChanges() {
   this.filterEmployees();
  }

  filterEmployees() {
    if (this.employees) {
    console.log(this.employees);
    this.available = []; this.assigned = []; this.delayed = []; this.active = []; this.onbreak = []; this.atlunch = [];
    this.employees.map(
      employee => {
        switch (employee.EmpStatusType) {
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
          default:
          console.log('Undefined');
        }
      }
    );
  }
  }



  changeStatus(employee) {
    this.childEvent.emit(employee);
  }


}
