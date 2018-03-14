import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-employeestatus',
  templateUrl: './employeestatus.component.html',
  styleUrls: ['./employeestatus.component.css'],
})
export class EmployeestatusComponent implements OnInit {

  rows = [
    {name: 'Employee1', location: 'asdsad' , min: 20, zone: 1, task: 'ST', threshold: 'exceeded'},
    {name: 'Employee2', location: 'asdsad' , min: 20, zone: 2, task: 'SC', threshold: 'approaching'},
    {name: 'Employee3', location: 'asdsad' , min: 20, zone: 3, threshold: 'approaching'},
    {name: 'Employee4', location: 'asdsad' , min: 20, zone: 4},
    {name: 'Employee5', location: 'asdsad' , min: 20, zone: 5},
    {name: 'Employee6', location: 'asdsad' , min: 20, zone: 6},
    {name: 'Employee7', location: 'asdsad' , min: 20, zone: 7},
    {name: 'Employee8', location: 'asdsad' , min: 20, zone: 8},
    {name: 'Employee9', location: 'asdsad' , min: 20, zone: 9},
  ];
  showEdit = false;
  columns = [{name: 'Name', show: true},
                {name: 'Min', show: true},
                {name: 'Location', show: true},
                {name: 'Zone', show: true}];
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

}
