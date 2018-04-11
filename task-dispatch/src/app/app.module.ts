import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import {LoginComponent} from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginService } from './_services/login.service';
import { SocketService } from './_services/socket.service';



@NgModule({
  declarations: [
    AppComponent, LoginComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, DashboardModule, BrowserAnimationsModule
  ],
  providers: [AuthGuard, LoginService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
