import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';


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

  areaUrl = 'http://172.16.9.239/HRCNextGn/api/dispatch/FunctionalAreaList';
  taskUrl = 'http://172.16.9.239/HRCNextGn/api/dispatch/Tasklist';
  facilityUrl = 'http://172.16.9.239/HRCNextGn/api/dispatch/Facilitylist';
  employeeUrl = 'http://172.16.9.239/HRCNextGn/api/dispatch/Employeelist';

  constructor(private http: HttpClient) { }

  // setFacility(facilityId) {
  //     this.currentFacility = facilityId;
  //     this.componentMethodCallSource.next();
  // }



  // setArea(areaId, facilityId) {
  //     this.currentFacility = facilityId;
  //     this.currentArea = areaId;
  // }

  getAreaList(facilityId): Observable<any> {
    const body = {'SteHirNodeId': facilityId};
    return this.http.post(this.areaUrl, body, httpOptions);
  }

  getEmployeeList(): Observable<any> {
    const body = {'SteHirNodeId': this.currentFacility};
    return this.http.post(this.employeeUrl, body, httpOptions);
  }

  getFacilityList(): Observable<any> {
    const body = {'SteHirNodeId': 20867};
     return this.http.post(this.facilityUrl, body, httpOptions);
    }

  getTaskList(): Observable<any> {
  const body = {'SteHirNodeId': this.currentFacility};
  return this.http.post(this.taskUrl, body, httpOptions);
}

}
