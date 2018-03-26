import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';
import { Router } from '@angular/router';



@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  _email;
  _password;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loginService.login(this._email, this._password).subscribe(
      response => {
      if (response.body['IsValid']) {
        console.log(response.headers.keys());
        console.log(response.headers.get('Set-Cookie'));
      // this.router.navigate(['/home']);
      } },
      error => console.log(error)
    );
  }
}
