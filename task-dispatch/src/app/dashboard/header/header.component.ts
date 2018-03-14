import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  selectedLink = 0;
  currentHospital;
  hospitals = [{name: 'Hospital 1', areas: ['Area1', 'Area2', 'Area3', 'Area4']},
               {name: 'Hospital 2', areas: ['Area1', 'Area2', 'Area3']},
               {name: 'Hospital 3', areas: ['Area1', 'Area2', 'Area3']}];

  setLink(linkNumber: number): void {
    this.selectedLink = linkNumber;
  }
  constructor() { }

  ngOnInit() {
    this.currentHospital = this.hospitals[0];
  }

  setHospital(event) {
     const currentHospital = this.hospitals.filter(function(d) {
      return d.name === event.target.value;
    });
    this.currentHospital = currentHospital[0];
  }
}
