import { Component, OnInit } from '@angular/core';
import { IFacility } from './facility';
import { DashboardService } from '../../_services/dashboard.service';
import { IArea } from './area';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentArea;
  facilities: IFacility[] = [];

  areas: IArea[] = [];

  constructor(private dashBoardService: DashboardService) { }

  ngOnInit() {
    this.dashBoardService.getFacilityList().subscribe(
      facility => facility.map(value => this.facilities.push(value)),
      error => console.log(error),
      () => this.getAreas(this.facilities[0].HirNode)
    );
  }

  changeFacility(event) {
     this.getAreas(event.target.value);
  }


  changeArea(areaId): void {
    if (this.currentArea !== areaId) {
    this.setArea(areaId);
    }
  }

  getAreas(facilityId) {
    this.dashBoardService.currentFacility = facilityId;
    this.areas = [];
    this.dashBoardService.getAreaList().subscribe(
        area => area.map(value => this.areas.push(value)),
        error => console.log(error),
        () => this.initializeData(this.areas[0].FunctionalArea)
    );
  }

  initializeData(areaId) {
      this.currentArea = areaId;
      this.dashBoardService.currentArea = areaId;
      this.dashBoardService.initializeData.next();
  }


  setArea(areaId) {
    this.currentArea = areaId;
    this.dashBoardService.currentArea = areaId;
    console.log(areaId);
    this.dashBoardService.filterData.next();
  }
}
