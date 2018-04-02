import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showLoader = true;
  constructor() { }

  ngOnInit() {
  }

  setLoader(value) {
    this.showLoader = value;
  }

}
