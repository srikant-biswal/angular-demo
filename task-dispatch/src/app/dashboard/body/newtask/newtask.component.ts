import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IArea } from 'app/models/area';
import { DashboardService } from 'app/_services/dashboard.service';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent implements OnInit {
  _name;
  _phone;
  areas: IArea[];
  currentArea;
  @Output() childEvent = new EventEmitter();

  constructor(private dashBoardService: DashboardService) { }

  ngOnInit() {
    // this.dashBoardService.initializeData$.subscribe(
    //   () => {
    //     this.areas = this.dashBoardService.areas;
    //     this.currentArea = this.dashBoardService.currentArea;
    //   }
    // );
    // this.dashBoardService.filterData$.subscribe(
    //   () => {
    //     this.currentArea = this.dashBoardService.currentArea;
    //   }
    // );
  }
    onSubmit() {
    }

    onCancel() {
      this.childEvent.emit();
    }

}
