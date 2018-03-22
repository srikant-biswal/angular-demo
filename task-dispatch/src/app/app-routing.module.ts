import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: 'home', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    { path: '', component: DashboardComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    declarations: [],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
