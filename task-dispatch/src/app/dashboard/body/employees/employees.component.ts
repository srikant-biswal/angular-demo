import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DashboardService } from '../../../_services/dashboard.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnChanges {
  @Input() employees;
  available = []; assigned = []; delayed = []; active = []; onbreak = []; atlunch = [];
  constructor(private dashboardService: DashboardService) { }

  ngOnChanges() {
    console.log(this.employees);
    this.available = []; this.assigned = []; this.delayed = []; this.active = []; this.onbreak = []; this.atlunch = [];
    this.employees.map(
      employee => {
        switch (employee['EmpStatusType']) {
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
