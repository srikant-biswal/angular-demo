import { Component, OnInit } from '@angular/core';
import { IFacility } from './facility';
import { DashboardService } from '../../_services/dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  selectedLink = 0;
  currentFacility;
  // facilities = [{name: 'Hospital 1', areas: ['Area1', 'Area2', 'Area3', 'Area4']},
  //              {name: 'Hospital 2', areas: ['Area1', 'Area2', 'Area3']},
  //              {name: 'Hospital 3', areas: ['Area1', 'Area2', 'Area3']}];

  facilities: IFacility[] = [];

  areas = ['Area1', 'Area2', 'Area3', 'Area4'];

  setLink(linkNumber: number): void {
    this.selectedLink = linkNumber;
  }
  constructor(private dashBoardService: DashboardService) { }

  ngOnInit() {
    this.dashBoardService.getFacilityList().subscribe(
      facility => facility.map(value => this.facilities.push(value)),
      error => console.log(error),
      () => this.setHospital(this.facilities[0].HirNode)
    );
  }

  changeFacility(event) {
     const currentFacility = this.facilities.find(facility => facility.Title === event.target.value);
     this.setHospital(currentFacility.HirNode);
  }

  setHospital(facilityId) {
    this.dashBoardService.setFacility(facilityId);
  }
}
