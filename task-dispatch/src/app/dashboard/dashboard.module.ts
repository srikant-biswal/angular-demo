import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard.component';
import { EmployeestatusComponent } from './employeestatus/employeestatus.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DndModule } from 'ng2-dnd';

@NgModule({
  imports: [
    CommonModule, NgxDatatableModule, DndModule.forRoot()
  ],
  declarations: [DashboardComponent, HeaderComponent, EmployeestatusComponent],
  exports: []
})
export class DashboardModule { }
