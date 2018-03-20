import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard.component';
import { EmployeestatusComponent } from './body/employees/employeestatus/employeestatus.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DndModule } from 'ng2-dnd';
import { TasksComponent } from './body/tasks/tasks.component';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../_services/dashboard.service';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesComponent } from './body/employees/employees.component';
import { BodyComponent } from './body/body.component';

@NgModule({
  imports: [
    CommonModule, NgxDatatableModule, DndModule.forRoot(), FormsModule,  HttpClientModule
  ],
  declarations: [DashboardComponent, HeaderComponent, EmployeestatusComponent, TasksComponent, EmployeesComponent, BodyComponent],
  providers: [DashboardService],
  exports: []
})
export class DashboardModule { }
