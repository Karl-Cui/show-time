import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  API_URL = 'http://localhost:8000';

  constructor(private httpClient: HttpService) { }

  /**
   * Requests to add new user
   * 
   * @param data 
   * request body
   */
  addUser(data) {
    return this.httpClient.post(`${this.API_URL}/users`, data);
  }

}
