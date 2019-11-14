import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_URL = 'http://localhost:8000';

  constructor(private httpClient: HttpService) { }

  /**
   * Checks if user is logged in
   */
  getCheckUser() {
    return sessionStorage.getItem('currentUser') != null;
  }

  /**
   * Gets current user
   */
  getUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
  }

  /**
   * Requests login
   * 
   * @param data 
   * request body
   */
  loginUser(data){
    return this.httpClient.post(`${this.API_URL}/users/login`, data);
  }

}
