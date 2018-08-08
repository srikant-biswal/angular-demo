import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../_services/login.service';
import { Router } from '@angular/router';
import { DashboardService } from 'app/_services/dashboard.service';
import { Environment} from '../_enviournments/environment'

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  _email;
  _password;
  showLoader = false;
  signInFailed = false;
  invalidUser = false;

  constructor(private loginService: LoginService, private router: Router, private dashboardService: DashboardService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.invalidUser = false;
    this.signInFailed = false;
    this.showLoader = true;
    this.loginService.login(this._email, this._password).subscribe(
      response => {
      if (response.body['isValid']) {
        console.log(response.headers.get(Environment.apiKey));
        this.dashboardService.key = response.headers.get(Environment.apiKey);
        this.router.navigate(['/home']);
      } else {
        this.showLoader = false;
        this.signInFailed = false;
        this.invalidUser = true;
      } },
      error => {
        this.invalidUser = false;
        this.signInFailed = true;
        this.showLoader = false;
        console.log(error);
      }
    );
  }
}
