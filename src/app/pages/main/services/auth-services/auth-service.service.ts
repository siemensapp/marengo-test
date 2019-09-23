import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(public jwtHelper: JwtHelperService) { }

  isAuthenticated() {
    let token = localStorage.getItem('authToken');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
