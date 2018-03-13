import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard.component';
import { EmployeestatusComponent } from './employeestatus/employeestatus.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DndModule } from 'ng2-dnd';
import { TasksComponent } from './tasks/tasks.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, NgxDatatableModule, DndModule.forRoot(), FormsModule
  ],
  declarations: [DashboardComponent, HeaderComponent, EmployeestatusComponent, TasksComponent],
  exports: []
})
export class DashboardModule { }
