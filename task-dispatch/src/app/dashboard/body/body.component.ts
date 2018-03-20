import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../_services/dashboard.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  showLoader;
  employees = []; filteredEmployees = [];
  tasks = []; filteredTasks = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
      this.dashboardService.initializeData$.subscribe(
        () => this.getEmployees()
      );
      this.dashboardService.filterData$.subscribe(
        () => this.filterEmployees()
      );
  }

  getEmployees() {
    this.showLoader = true;
    this.employees = [];
    this.dashboardService.getEmployeeList().subscribe(
        employee => employee.map(value => this.employees.push(value)),
        error => console.log(error),
        () => this.getTasks()
    );
  }

  getTasks() {
    console.log(this.employees);
    this.tasks = [];
    this.dashboardService.getTaskList().subscribe(
        task => task['data'].map(value => this.tasks.push(value)),
        error => console.log(error),
        () => this.filterEmployees());
    console.log(this.tasks);
  }

  filterEmployees() {
    const areaId = this.dashboardService.currentArea;
    console.log(areaId);
    this.filteredEmployees = this.employees.filter(
      employee => employee.FunctionalAreaId === areaId
    );
    console.log(this.filteredEmployees);
    this.filterTasks(areaId);
  }

  filterTasks(areaId) {
    console.log(this.tasks);
    this.filteredTasks = this.tasks.filter(
      task => task.TskArea === areaId
    );
    console.log(this.filteredTasks);
    this.showLoader = false;
  }
}
