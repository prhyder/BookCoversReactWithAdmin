import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private isAuthenticated: boolean = false;

  constructor(private authService: NbAuthService, private router: Router) {
    //this.authService.isAuthenticated().subscribe((value: boolean) => {
    //  this.isAuthenticated = value;
    //});
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.authService.isAuthenticated().subscribe((value: boolean) => {
        this.isAuthenticated = value;
      });

      if (this.isAuthenticated) {
        return true;
      }
      //else {
      //  //this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
      //  //return false;
      //}

    this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
