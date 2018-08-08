import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HubConnection } from '@aspnet/signalr';
import { Environment} from '../_enviournments/environment'

const hdrs = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable()
export class LoginService {
  private _hubConnection: HubConnection;
  loginUrl = Environment.apiUrl + 'auth/signin'; // 'http://localhost/teampro/api/auth/signin';



  constructor(private http: HttpClient) { }

    login(userName, password): Observable<any> {
      const body = {'UserName': userName , 'Password': password};
      return this.http.post(this.loginUrl, body, {headers : hdrs, observe: 'response'});
    }
}
