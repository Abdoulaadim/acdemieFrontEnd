import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuardGuard implements CanActivate {
  constructor(private tokenService : TokenService , private accountService: AccountService,private router: Router,private authService : AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
    if(!this.tokenService.loggedIn()){
      this.tokenService.remove();
      this.accountService.changeStatus(false);
      this.router.navigateByUrl("/login")
      return false;
    }

    return true;
  }

}
