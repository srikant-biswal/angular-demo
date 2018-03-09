import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard.component';
import { EmployeestatusComponent } from './employeestatus/employeestatus.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DashboardComponent, HeaderComponent, EmployeestatusComponent],
  exports: []
})
export class DashboardModule { }
