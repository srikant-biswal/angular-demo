import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { IEmployee } from 'app/models/employee';
import {IFacility} from 'app/models/facility';
import { IArea } from 'app/models/area';
import { ITaskColumnDb } from 'app/models/taskcolumndb';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DashboardService {
  currentFacility;
  currentArea;

  initializeData = new Subject<any>();
  initializeData$ = this.initializeData.asObservable();

  filterData = new Subject<any>();
  filterData$ = this.filterData.asObservable();
  baseUrl = 'http://172.16.9.239/HRCNextGn/api/dispatch';

  constructor(private http: HttpClient) { }

  getAreaList(): Observable<IArea[]> {
    const body = {'SteHirNodeId': this.currentFacility};
    return this.http.post<IArea[]>(this.baseUrl + '/FunctionalAreaList', body, httpOptions);
  }

  getEmployeeList(): Observable<IEmployee[]> {
    const body = {'SteHirNodeId': this.currentFacility};
    return this.http.post<IEmployee[]>(this.baseUrl + '/Employeelist', body, httpOptions);
  }

  getFacilityList(): Observable<IFacility[]> {
    const body = {'SteHirNodeId': 20867};
     return this.http.post<IFacility[]>(this.baseUrl + '/FacilityList', body, httpOptions);
    }

  getTaskList(): Observable<any> {
  const body = {'SteHirNodeId': this.currentFacility};
  return this.http.post(this.baseUrl + '/TaskList', body, httpOptions);
}

  getTaskColumnConfig(): Observable<any> {
    return this.http.post(this.baseUrl + '/Config/TaskGridColumnList', {}, httpOptions);
  }



}
