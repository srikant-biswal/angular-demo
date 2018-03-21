import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email1;
  password1;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    alert(this.email1 + '' + this.password1);
  }

}
