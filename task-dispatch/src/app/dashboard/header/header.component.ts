import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IFacility } from 'app/models/facility';
import { DashboardService } from 'app/_services/dashboard.service';
import { IArea } from 'app/models/area';
import { Router } from '@angular/router';
import {BodyComponent} from '../body/body.component';
import { HubConnection } from '@aspnet/signalr';
import { SocketService } from 'app/_services/socket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentArea;
  facilities: IFacility[] = [];
  @Output() loaderEvent = new EventEmitter();

  areas: IArea[] = [];
  private _hubConnection: HubConnection;
  constructor(private socketService: SocketService, private dashBoardService: DashboardService, private router: Router) { }

  ngOnInit() {
      this.loaderEvent.emit(true);
      this._hubConnection = new HubConnection('http://localhost:5000/signalr');
      this._hubConnection
        .start()
        .then(() => {
          this.socketService.hubConnection = this._hubConnection;
        })
        .catch(err => console.log('Error while establishing connection :('));
        this.getFacilities();

  }

  changeFacility(event) {
     this.loaderEvent.emit(true);
     this.getAreas(event.target.value);
  }


  changeArea(areaId): void {
    if (this.currentArea !== areaId) {
    this.setArea(areaId);
    }
  }

  getFacilities() {
    this.dashBoardService.getFacilityList().subscribe(
      facility => this.facilities = facility,
      error => this.handleError(error),
      () => this.getAreas(this.facilities[0].hirNode)
    );
  }

  getAreas(facilityId) {
    this.dashBoardService.currentFacility = facilityId;
    this.areas = [];
    this.dashBoardService.getAreaList().subscribe(
        area => this.areas = area,
        error => console.log(error),
        () => this.initializeData(this.areas[0].functionalArea)
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

  showUnsignedEmployees() {
    this.dashBoardService.unsignedEmployees.next();
  }

  handleError(error) {
    if (error.status === 401) {
      this.router.navigate(['/login']);
    }
    console.log(error);
  }
}
