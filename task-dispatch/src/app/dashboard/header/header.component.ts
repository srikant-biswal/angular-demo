import { Component, OnInit } from '@angular/core';
import { IFacility } from 'app/models/facility';
import { DashboardService } from 'app/_services/dashboard.service';
import { IArea } from 'app/models/area';
import { Router } from '@angular/router';
import {BodyComponent} from '../body/body.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentArea;
  facilities: IFacility[] = [];

  areas: IArea[] = [];

  constructor(private dashBoardService: DashboardService, private router: Router) { }

  ngOnInit() {
    this.dashBoardService.getFacilityList().subscribe(
      facility => this.facilities = facility,
      error => this.handleError(error),
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
        area => this.areas = area,
        error => console.log(error),
        () => this.initializeData(this.areas[0].FunctionalArea)
    );
  }

  initializeData(areaId) {
      this.currentArea = areaId;
      this.dashBoardService.currentArea = areaId;
      this.dashBoardService.areas = this.areas;
      this.dashBoardService.initializeData.next();
  }


  setArea(areaId) {
    this.currentArea = areaId;
    this.dashBoardService.currentArea = areaId;
    console.log(areaId);
    this.dashBoardService.filterData.next();
  }

  handleError(error) {
    if (error.status === 401) {
      this.router.navigate(['/login']);
    }
    console.log(error);
  }
}
