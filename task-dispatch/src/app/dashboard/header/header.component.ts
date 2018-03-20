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
  currentFacility;
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
    this.currentFacility = facilityId;
    this.areas = [];
    this.dashBoardService.getAreaList(facilityId).subscribe(
        area => area.map(value => this.areas.push(value)),
        error => console.log(error),
        () => this.initializeData(this.areas[0].FunctionalArea)
    );
  }

  initializeData(areaId) {
      this.dashBoardService.currentFacility = this.currentFacility;
      console.log(this.currentFacility);
      this.dashBoardService.initializeData.next();
      this.currentArea = areaId;
      this.dashBoardService.currentArea = areaId;
  }


  setArea(areaId) {
    this.currentArea = areaId;
    this.dashBoardService.currentArea = areaId;
    console.log(areaId);
    this.dashBoardService.filterData.next();
  }
}
