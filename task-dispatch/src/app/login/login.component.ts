import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../_services/login.service';
import { Router } from '@angular/router';
import { DashboardService } from 'app/_services/dashboard.service';

const key = 'MIIBITANBGKQHKIG9W0BAQEFAAOCAQ4AMIIBCQKCAQBJ67E+ROUGDNVVNNVQFWGLTK+3DIIEMIMXHMT5WTJ6BD1OWQHNBPQ6XT1MYAT6QPBRJFCDKBC8QJ';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  _email;
  _password;
  invalidUser = false;

  constructor(private loginService: LoginService, private router: Router, private dashboardService: DashboardService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loginService.login(this._email, this._password).subscribe(
      response => {
      if (response.body['isValid']) {
        console.log(response.headers.get(key));
        this.dashboardService.key = response.headers.get(key);
        this.router.navigate(['/home']);
      } else {
        this.invalidUser = true;
      } },
      error => console.log(error)
    );
  }
}
