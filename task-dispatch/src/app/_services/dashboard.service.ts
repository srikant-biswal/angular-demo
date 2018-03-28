import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DashboardService {
  currentFacility;
  currentArea;
  key;

  initializeData = new Subject<any>();
  initializeData$ = this.initializeData.asObservable();

  filterData = new Subject<any>();
  filterData$ = this.filterData.asObservable();
  baseUrl = 'http://localhost/hrcapi/api/dispatch';

  constructor(private http: HttpClient) { }

  getHeaders(): any{
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':'Bearer ' + this.key })
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
