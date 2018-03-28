import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const hdrs = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable()
export class LoginService {

  loginUrl = 'http://localhost/hrcapi/api/authapi/signin';


  constructor(private http: HttpClient) { }

    login(userName, password): Observable<any> {
      const body = {'UserName': userName , 'Password': password};
      return this.http.post(this.loginUrl, body, {headers : hdrs, observe: 'response'});
    }
}
