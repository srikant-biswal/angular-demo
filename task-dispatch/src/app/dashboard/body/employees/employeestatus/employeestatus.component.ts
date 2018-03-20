import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-employeestatus',
  templateUrl: './employeestatus.component.html',
  styleUrls: ['./employeestatus.component.css'],
})
export class EmployeestatusComponent implements OnInit {
  @Input() title: String;
  @Input() rows = [];
  showEdit = false;
  columns =    [{name: 'Name', prop: 'Brief' , show: true},
                {name: 'Min', prop: 'DiffMinute', show: true},
                {name: 'Location', prop: 'Location', show: true},
                {name: 'Zone', prop: 'ZoneBrief', show: true}];
  selected = [];

  constructor() { }

  ngOnInit() {
  }

  saveEdit(): void {
    this.showEdit = false;
  }


  cancelEdit(): void {
    this.showEdit = false;
  }

  getRowClass(row) {
    // return {
    //   'exceeded': (row.threshold === 'exceeded'),
    //   'approaching': (row.threshold === 'approaching')
    // };
  }

  getCellClass({ row, column, value }): any {
    return {
      'st': value === 'ST',
      'sc': value === 'SC'
    };
  }



  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    console.log(this.selected);
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
