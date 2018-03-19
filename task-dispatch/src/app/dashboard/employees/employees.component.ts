import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../_services/dashboard.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees;
  available = []; assigned = []; delayed = []; active = []; onbreak = []; atlunch = [];
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.componentMethodCalled$.subscribe(
      () =>  this.getData());
  }

  getData() {
    this.available = []; this.assigned = []; this.delayed = []; this.active = []; this.onbreak = []; this.atlunch = [];
    this.dashboardService.getEmployeeList().subscribe(
      task =>  task.map(value => {
        switch (value['EmpStatusType']) {
          case 1:
          this.available.push(value);
          break;
          case 2:
          this.assigned.push(value);
          break;
          case 3:
          this.delayed.push(value);
          break;
          case 4:
          this.active.push(value);
          break;
          case 5:
          this.onbreak.push(value);
          break;
          case 6:
          this.atlunch.push(value);
          break;
        }
      }) ,
      error => console.log(error ));
  }
}
