import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DashboardService } from '../../../_services/dashboard.service';
import { ITask } from './task';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnChanges {
  activeTab = 1;
  @Input() tasks: ITask[] = [];
  @Input() columnConfig;
  temp: ITask[];
  rows: ITask[];
  filter = '';
  showEdit = false;
  showSelectAll;
  columns = [];
  selected = [];

  constructor(private dashboardService: DashboardService) {
  }

  ngOnChanges() {
      console.log(this.tasks);
      this.activeTab = 1;
      this.temp = this.tasks.filter( task => task.TskStatusType === 1);
      this.rows = this.temp;
      this.sortColumns();
      this.columns = this.columnConfig.filter(column => column.statusType === 1);
      console.log(this.columns);
      this.checkSelectAll();
  }


  changeTab(tab): void {
     if (this.activeTab !== tab) {
      this.columns = [];
      this.activeTab = tab;
      this.temp = this.tasks.filter( task => task.TskStatusType === tab);
      this.rows = this.temp;
      this.columns = this.columnConfig.filter(column => column.statusType === tab);
      // this.sortColumns();
      console.log(this.columnConfig);
      console.log(this.columns);
     }
  }

  sortColumns() {
    this.columnConfig.sort(function(a, b) {
      return (a['displayOrder'] > b['displayOrder'] ? 1 : -1);
    });
  }

  getRowClass(row: ITask) {
    const date = new Date();
    const taskDate = new Date(row.CompleteNeeded);
    const timeDiff = Math.ceil((taskDate.getTime() - date.getTime()) / (1000 * 60) );
     return {
       'exceeded': (timeDiff < 0),
       'approaching': (timeDiff > 0 && timeDiff < 10)
     };
  }

  getCellClass({ row, column, value }): any {
    return {
      'st': value === 'ST',
      'sc': value === 'SC'
    };
  }

  updateFilter() {
     const val = this.filter.toLowerCase();
     if (val !== '') {
    const colsAmt = this.columns.length;
    const keys = this.columns.map(function(col) {
        if (col.show) {
          return col.prop;
        }
    });
    this.rows = this.temp.filter(function(item) {
      let searchStr = '';
      for (let i = 0; i < colsAmt; i++) {
        if (item[keys[i]]) {
        searchStr += (item[keys[i]]).toString().toLowerCase();
        }
      }
      return searchStr.indexOf(val) !== -1 || !val;
    });
  } else {
      this.rows = this.temp;
  }
  }

  clearFilter() {
    this.filter = '';
    this.rows = this.temp;
  }

  saveEdit() {
      this.showEdit = false;
  }

  cancelEdit() {
    this.showEdit = false;
  }

  toggleSelectAll() {
    this.columns.map(col => col.show = this.showSelectAll);
    this.showSelectAll = ! this.showSelectAll;
  }

    checkSelectAll() {
      if (this.columns.every(col => col.show === true)) {
        this.showSelectAll = false;
    } else {
      this.showSelectAll = true;
    }
    }



  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    console.log('Select Event', this.selected);
  }

  add() {
    this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    this.selected = [ this.rows[1], this.rows[3] ];
  }

  remove() {
    this.selected = [];
  }

}
