import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import {LoginComponent} from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginService } from './_services/login.service';


@NgModule({
  declarations: [
    AppComponent, LoginComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, DashboardModule
  ],
  providers: [AuthGuard, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
