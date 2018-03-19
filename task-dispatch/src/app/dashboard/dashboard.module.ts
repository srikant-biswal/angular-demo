import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard.component';
import { EmployeestatusComponent } from './employees/employeestatus/employeestatus.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DndModule } from 'ng2-dnd';
import { TasksComponent } from './tasks/tasks.component';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../_services/dashboard.service';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesComponent } from './employees/employees.component';

@NgModule({
  imports: [
    CommonModule, NgxDatatableModule, DndModule.forRoot(), FormsModule,  HttpClientModule
  ],
  declarations: [DashboardComponent, HeaderComponent, EmployeestatusComponent, TasksComponent, EmployeesComponent],
  providers: [DashboardService],
  exports: []
})
export class DashboardModule { }
