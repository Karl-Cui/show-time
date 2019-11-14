import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  API_URL = 'http://localhost:8000';

  constructor(private httpClient: HttpService) { }

  /**
   * Logs out the current user
   */
  logout(){
    return this.httpClient.get(`${this.API_URL}/logout`);
  }

  /**
   * Gets the current user
   */
  getSessionUser(){
    return this.httpClient.get(`${this.API_URL}/getsessionuser`);
  }

}
