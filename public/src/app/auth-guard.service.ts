import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})

// authentication guard for routes which require user to be logged in
export class AuthGuardService implements CanActivate {

  API_URL = 'http://localhost:8000';

  constructor(private httpClient: HttpService, public router: Router) { }

  // required to implement CanActivate interface
  canActivate(): boolean {
    this.getSessionUser().subscribe((response)=>{
      sessionStorage.setItem('currentUser', JSON.stringify(response));
      return true
    }, (error) => {
      sessionStorage.removeItem('currentUser');
      this.router.navigate(['login']);
      return false
    });
    return true
  }

  getSessionUser(){
    return this.httpClient.get(`${this.API_URL}/getsessionuser`);
  }

  sessionChecker(){
    return this.httpClient.get(`${this.API_URL}/sessionchecker`);
  }
}
