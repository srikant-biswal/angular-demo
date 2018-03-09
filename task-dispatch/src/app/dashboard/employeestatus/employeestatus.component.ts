import { Component, OnInit } from '@angular/core';
import { IEmployee } from './employee';

@Component({
  selector: 'app-employeestatus',
  templateUrl: './employeestatus.component.html',
  styleUrls: ['./employeestatus.component.css']
})
export class EmployeestatusComponent implements OnInit {
  showEdit: boolean;
  isSelectAll: boolean;
  isDesc: boolean;
  column: string;
  cardTitle = 'Available';

  employees: IEmployee[] = [
    {Id: 1, Name: 'Employee1', Location: 'asdsad' , Min: 20, Zone: 2, isSelected: false},
    {Id: 2, Name: 'Employee2', Location: 'asdsad' , Min: 20, Zone: 21, isSelected: false},
    {Id: 3, Name: 'Employee3', Location: 'asdsad' , Min: 20, Zone: 21, isSelected: false},
    {Id: 4, Name: 'Employee4', Location: 'asdsad' , Min: 20, Zone: 21, isSelected: false},
    {Id: 5, Name: 'Employee5', Location: 'asdsad' , Min: 20, Zone: 21, isSelected: false},
    {Id: 5, Name: 'Employee5', Location: 'asdsad' , Min: 20, Zone: 21, isSelected: false},
    {Id: 5, Name: 'Employee5', Location: 'asdsad' , Min: 20, Zone: 21, isSelected: false},
    {Id: 5, Name: 'Employee5', Location: 'asdsad' , Min: 20, Zone: 21, isSelected: false},
    {Id: 5, Name: 'Employee5', Location: 'asdsad' , Min: 20, Zone: 21, isSelected: false},
  ];

  columns = [{name: 'Name', show: true},
             {name: 'Min', show: true}
            , {name: 'Location', show: true}
            , {name: 'Zone', show: true}];


  constructor() { }

  ngOnInit() {
    this.isSelectAll = false;
    this.showEdit = false;
  }

  selectAll(): void {
    if (this.isSelectAll) {
      this.employees.map(emp => emp.isSelected = true);
    } else {
      this.employees.map(emp => emp.isSelected = false);
    }
  }

  sort(property) {
    this.isDesc = !this.isDesc;
    this.column = property;
    const direction = this.isDesc ? 1 : -1;

    this.employees.sort(function(a, b) {
        if (a[property] < b[property]) {
            return -1 * direction;
        } else if ( a[property] > b[property]) {
            return 1 * direction;
        } else {
            return 0;
        }
    });
}

showEditOptions(): void {
    this.showEdit = true;
}

toggle(col) {
   col.show = !col.show;
}


}
