import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterAdminService {

  API_URL = 'http://localhost:8000';

  constructor(private httpClient: HttpService) { }

  /**
   * Requests to register a new administrator
   * 
   * @param data 
   * request body
   */
  addAdmin(data) {
    return this.httpClient.post(`${this.API_URL}/users/admin`, data);
  }

}
