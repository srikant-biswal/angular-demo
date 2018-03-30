import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DashboardService } from 'app/_services/dashboard.service';

@Component({
  selector: 'app-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.css']
})
export class ActionbarComponent implements OnInit {
  @Output() childEvent = new EventEmitter();
  selected: any[][];
  flag = true;

  constructor(private dashBoardService: DashboardService) { }

  ngOnInit() {
    this.dashBoardService.actionBar$.subscribe(
      () => this.checkSelected()
    );
  }

  checkSelected() {
    this.selected = this.dashBoardService.selected;
    console.log(this.selected);
    const count = this.countInObject(this.selected);
    if (count && this.flag) {
      this.flag = false;
      this.childEvent.emit(true);
    }
    if (!count) {
      this.flag = true;
      this.childEvent.emit(false);
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

  unselectAll() {
    this.dashBoardService.selected = [];
    this.dashBoardService.uncheck.next();
    this.childEvent.emit(false);
    this.flag = true;
 }
}
