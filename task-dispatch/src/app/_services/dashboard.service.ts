import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { IArea } from 'app/models/area';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DashboardService {
  currentFacility;
  currentArea;
  key;
  areas: IArea[];
  selected: any[][] = [];

  initializeData = new Subject<any>();

  filterData = new Subject<any>();

  actionBar = new Subject<any>();

  uncheck = new Subject<any>();

  baseUrl = 'http://172.16.9.239/teampro/api/dispatch';

  constructor(private http: HttpClient) { }

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
}
