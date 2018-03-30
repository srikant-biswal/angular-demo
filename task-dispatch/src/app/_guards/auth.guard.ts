import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DashboardService } from 'app/_services/dashboard.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private dashboardService: DashboardService, private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (this.dashboardService.key) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
