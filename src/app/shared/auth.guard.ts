/*============================================;
Title: nodebucket;
Author: Professor Krasso ;
Date: 18 March 2021;
Modified By: Douglas Jenkins;
Description: creating a sign in page
;===========================================*/

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// CookieService needed to be added so that it can work properly
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) {

  }

// will be activated if it can tell the the employee if is correct
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const sessionUser = this.cookieService.get('session_user');

    if (sessionUser)
    {
      return true;
    }
    else
    {
      this.router.navigate(['/session/login']);
      return false;
    }
  }

}
