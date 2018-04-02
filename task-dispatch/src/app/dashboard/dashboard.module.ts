import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard.component';
import { EmployeestatusComponent } from './body/employees/employeestatus/employeestatus.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DndModule } from 'ng2-dnd';
import {SidebarModule} from 'ng-sidebar';
import { TasksComponent } from './body/tasks/tasks.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesComponent } from './body/employees/employees.component';
import { BodyComponent } from './body/body.component';
import { FormsModule } from '@angular/forms';
import { NewtaskComponent } from './body/newtask/newtask.component';
import { NgxResizeWatcherDirective } from './body/ngx-resize-watcher.directive';
import { ActionbarComponent } from './body/actionbar/actionbar.component';
import { DashboardService } from '../_services/dashboard.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  imports: [
    CommonModule, NgxDatatableModule, DndModule.forRoot(), SidebarModule.forRoot(), FormsModule,
    HttpClientModule, NgbModule.forRoot()
  ],
  declarations: [DashboardComponent, HeaderComponent, EmployeestatusComponent, TasksComponent,
    EmployeesComponent, BodyComponent, NewtaskComponent, NgxResizeWatcherDirective, ActionbarComponent],
  providers: [DashboardService],
  exports: [FormsModule]
})
export class DashboardModule { }
