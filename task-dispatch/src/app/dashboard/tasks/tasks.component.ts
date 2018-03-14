import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  activeTab = 'unassigned';
   tasks = [
    {siteName: 'Hospital1', requestNumber: 1000 ,
    taskClass: 'Radiology', startLocation: 1001, destLocation: 1000, task: 'ST', threshold: 'exceeded', status: 'assigned'},
    {siteName: 'Hospital2', requestNumber: 1000 ,
    taskClass: 'Radiology', startLocation: 1002, destLocation: 1000, task: 'SC', threshold: 'approaching', status: 'assigned'},
    {siteName: 'Hospital3', requestNumber: 1000 ,
    taskClass: 'Radiology', startLocation: 1003, destLocation: 1000, threshold: 'approaching', status: 'assigned'},
    {siteName: 'Hospital4', requestNumber: 1000 ,
    taskClass: 'Radiology', startLocation: 1004, destLocation: 1000, task: 'ST', threshold: 'exceeded', status: 'unassigned'},
    {siteName: 'Hospital5', requestNumber: 1000 ,
    taskClass: 'Radiology', startLocation: 1005, destLocation: 1000, task: 'SC', threshold: 'approaching', status: 'unassigned'},
    {siteName: 'Hospital6', requestNumber: 1000 ,
    taskClass: 'Radiology', startLocation: 1006, destLocation: 1000 , status: 'active'},
    {siteName: 'Hospital7', requestNumber: 1000 ,
    taskClass: 'Radiology', startLocation: 1006, destLocation: 1000, threshold: 'approaching', status: 'delayed'},
    {siteName: 'Hospital8', requestNumber: 1000 ,
    taskClass: 'Radiology', startLocation: 1006, destLocation: 1000, threshold: 'approaching', status: 'completed'},
    {siteName: 'Hospital9', requestNumber: 1000 ,
    taskClass: 'Radiology', startLocation: 1006, destLocation: 1000, threshold: 'approaching', status: 'cancelled'},
    {siteName: 'Hospital10', requestNumber: 1000 ,
    taskClass: 'Radiology', startLocation: 1006, destLocation: 1000, threshold: 'approaching', status: 'unassigned'},
  ];

  temp;
  rows;
  filter = '';
  showEdit = false;
  columns = [   {name: 'Site Name', prop: 'siteName', show: true},
                {name: 'Request Number', prop: 'requestNumber', show: true},
                {name: 'Task Class', prop: 'taskClass', show: true},
                {name: 'Start Location', prop: 'startLocation', show: true},
                {name: 'Dest Location', prop: 'destLocation', show: true}];
  selected = [];
  constructor() { }

  ngOnInit() {
      this.temp = this.tasks.filter(function(d) {
        return d.status.indexOf('unassigned') !== -1;
      });
      this.rows = this.temp;
  }

  changeTab(tab): void {
      this.activeTab = tab;
      this.temp = this.tasks.filter(function(d) {
        return d.status === tab;
      });
      this.rows = this.temp;
  }


  getRowClass(row) {
    return {
      'exceeded': (row.threshold === 'exceeded'),
      'approaching': (row.threshold === 'approaching')
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
        searchStr += (item[keys[i]]).toString().toLowerCase();
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
