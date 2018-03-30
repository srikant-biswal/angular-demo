import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IArea } from 'app/models/area';
import { DashboardService } from 'app/_services/dashboard.service';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent implements OnInit, OnDestroy {
  _name;
  _phone;
  areas: IArea[];
  currentArea;
  initializeSubscription;
  filterSubscription;
  @Output() childEvent = new EventEmitter();

  constructor(private dashBoardService: DashboardService) { }

  ngOnInit() {
    this.initializeSubscription = this.dashBoardService.initializeData.subscribe(
      () => {
        this.areas = this.dashBoardService.areas;
        this.currentArea = this.dashBoardService.currentArea;
      }
    );
    this.filterSubscription = this.dashBoardService.filterData.subscribe(
      () => {
        this.currentArea = this.dashBoardService.currentArea;
      }
    );
  }

  ngOnDestroy() {
    this.initializeSubscription.unsubscribe();
    this.filterSubscription.unsubscribe();
  }
    onSubmit() {
    }

    onCancel() {
      this.childEvent.emit();
    }

}
