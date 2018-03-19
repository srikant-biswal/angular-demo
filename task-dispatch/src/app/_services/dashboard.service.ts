import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITask } from '../dashboard/tasks/task';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DashboardService {
  currentFacility;
  private componentMethodCallSource = new Subject<any>();
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();


  taskUrl = 'http://172.16.9.239/HRCNextGn/api/dispatch/Tasklist';
  facilityUrl = 'http://172.16.9.239/HRCNextGn/api/dispatch/Facilitylist';
  employeeUrl = 'http://172.16.9.239/HRCNextGn/api/dispatch/Employeelist';

  constructor(private http: HttpClient) { }

  setFacility(facilityId) {
      this.currentFacility = facilityId;
      this.componentMethodCallSource.next();
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
