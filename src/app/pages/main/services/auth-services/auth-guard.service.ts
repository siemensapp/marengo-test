import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { Router,CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( public auth: AuthServiceService, public router: Router) { }
  canActivate() {
    if( !this.auth.isAuthenticated() ) {
      this.router.navigate(['landing']);
      return false;
    }
    return true;
  }
}
