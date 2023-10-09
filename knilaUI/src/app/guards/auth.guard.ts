import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { CAuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard  implements CanActivate {
  constructor(private authService: CAuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean| UrlTree {
    let url: string = state.url;
    return this.authService.checkLogin(url,false);
  }
}
@Injectable({
    providedIn: 'root'
  })
export class AnonymousGuard implements CanActivate {
    constructor(private authService: CAuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean| UrlTree { 
      let url: string = state.url;
      return this.authService.checkLogin(url,true);
    }
  }
