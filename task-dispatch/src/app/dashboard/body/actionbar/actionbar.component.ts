import { Component, OnInit, Output, EventEmitter, OnDestroy, NgZone } from '@angular/core';
import { DashboardService } from 'app/_services/dashboard.service';
import { IEmployee } from 'app/models/employee';
import { ITask } from '../../../models/task';

@Component({
  selector: 'app-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.css']
})
export class ActionbarComponent implements OnInit, OnDestroy {
  actionBarLayout = 0;
  selectedEmployee: IEmployee;
  selectedTask: ITask;
  @Output() setActionBarEvent = new EventEmitter();
  @Output() assignTaskEvent = new EventEmitter();

  selected: any[][] = [];
  flag = true;
  actionBarSubscription;

  constructor(private dashBoardService: DashboardService, private ngZone: NgZone) {

   }

  ngOnInit() {
    this.actionBarSubscription = this.dashBoardService.actionBar.subscribe(
      () => this.checkSelected()
    );
  }

  ngOnDestroy() {
    this.actionBarSubscription.unsubscribe();
  }

  checkSelected() {
    this.selected = this.dashBoardService.selected;
    console.log(this.selected);
    const count = this.countInObject(this.selected);
    this.setActionBar(count);
    if (count && this.flag) {
      this.flag = false;
      this.setActionBarEvent.emit(true);
    }
    if (!count) {
      this.flag = true;
      this.setActionBarEvent.emit(false);
    }
  }

   countInObject(obj) {
    let count = 0;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
           count += obj[key].length;
         }
    }
    return count;
  }

    setActionBar(count) {
      if (count === 1) {
          if (this.selected[0]) {
              if (this.selected[0][0]) {
            this.actionBarLayout = 0;
            this.selectedEmployee = this.selected[0][0];
              } else if (this.selected[1][0]) {
                this.actionBarLayout = 1;
                this.selectedTask = this.selected[1][0];
                }
          } else  {
            this.actionBarLayout = 1;
            this.selectedTask = this.selected[1][0];
          }
      } else {
           if (this.selected[0] && this.selected[1]) {
          this.selectedEmployee = this.selected[0][0];
          this.selectedTask = this.selected[1][0];
          if (this.selectedEmployee && this.selectedTask) {
            if (this.selectedEmployee.empStatusType === 1 && this.selectedTask.tskStatusType === 1) {
              this.actionBarLayout = 2;
            } else {
              this.actionBarLayout = -1;
            }
          }
        }
      }
    }

    assignTask() {
      this.unselectAll();
      this.selectedEmployee.empStatusType = 2;
      this.selectedTask.assignedPersonnel = this.selectedEmployee.brief;
      this.selectedTask.tskStatusType = 2;
      this.assignTaskEvent.emit({employee: this.selectedEmployee, task: this.selectedTask});
    }

    changeEmployeeStatus(newStatus) {
      if (newStatus !== 4) {
        this.unselectAll();
      }
      this.dashBoardService.changeEmployeeStatus.next({employee: this.selectedEmployee, newStatus: newStatus});
    }

    cancelTask() {
      this.dashBoardService.cancelTask.next(this.selectedTask);
    }

    copyTask() {
      this.unselectAll();
      this.dashBoardService.copyTask.next(this.selectedTask);
    }

  unselectAll() {
    this.dashBoardService.selected = [];
    this.dashBoardService.uncheckEmployees.next();
    this.dashBoardService.uncheckTasks.next();
    this.setActionBarEvent.emit(false);
    this.flag = true;
 }
}
