import { Injectable, EventEmitter, Output, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { IArea } from 'app/models/area';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { ITask } from 'app/models/task';



@Injectable()
export class DashboardService {
  currentFacility;
  currentArea;
  key;
  areas: IArea[];
  selected: any[][] = [];
  taskToCopy: ITask;
  initializeData = new Subject<any>();
  unsignedEmployees = new Subject<any>();
  filterData = new Subject<any>();
  copyTask = new Subject<any>();
  assignTask = new Subject<any>();
  cancelTask = new Subject<any>();
  actionBar = new Subject<any>();
  changeEmployeeStatus = new Subject<any>();
  uncheckEmployees = new Subject<any>();
  uncheckTasks = new Subject<any>();

  baseUrl = 'http://172.16.9.239/teampro/api/dispatch';

  constructor(private http: HttpClient, private ngZone: NgZone) { }

  getHeaders(): any {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.key })
    };
  }

  getAreaList(): Observable<any> {
    console.log(this.key);
    const body = {'SteHirNodeId': this.currentFacility};
    return this.http.post(this.baseUrl + '/FunctionalAreaList', body, this.getHeaders());
  }

  getEmployeeList(): Observable<any> {
    const body = {'SteHirNodeId': this.currentFacility};
    return this.http.post(this.baseUrl + '/Employeelist', body, this.getHeaders());
  }

  getFacilityList(): Observable<any> {
    const body = {'SteHirNodeId': 20867};
     return this.http.post(this.baseUrl + '/FacilityList', body, this.getHeaders());
    }

  getTaskList(): Observable<any> {
  const body = {'SteHirNodeId': this.currentFacility};
    return this.http.post(this.baseUrl + '/TaskList', body, this.getHeaders());
}

  getTaskColumnConfig(): Observable<any> {
    return this.http.post(this.baseUrl + '/Config/TaskGridColumnList', {}, this.getHeaders());
  }

  getEmployeeColumnConfig(): Observable<any> {
    return this.http.post(this.baseUrl + '/Config/PersonnelGridColumnList', {}, this.getHeaders());
  }

  getTaskClass(): Observable<any> {
    const body = {'SteHirNodeId': this.currentFacility};
    return this.http.post(this.baseUrl + '/TaskClass/TaskClassWithEntryFieldList', body, this.getHeaders());
  }

  getModeList(): Observable<any> {
    return this.http.get(this.baseUrl + '/GetModeTypeList', this.getHeaders());
  }

  getEquipmentList(): Observable<any> {
    return this.http.get(this.baseUrl + '/GetEquipmentTypeList', this.getHeaders());
  }

  getTaskDelayList(): Observable<any> {
    return this.http.get(this.baseUrl + '/GetTaskDelayTypeList', this.getHeaders());
  }

  getTaskCancelList(): Observable<any> {
    return this.http.get(this.baseUrl + '/GetTaskCancelTypeList', this.getHeaders());
  }

  getLocationList(): Observable<any> {
    const body = {'SteHirNodeId': this.currentFacility};
    return this.http.post(this.baseUrl + '/LocationList', body, this.getHeaders());
  }

}

