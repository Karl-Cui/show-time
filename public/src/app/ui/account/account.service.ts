import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

    API_URL = 'http://localhost:8000';

    constructor(private httpClient: HttpService) { }

    /**
     * Sends request to change user data
     * 
     * @param data 
     * New user data
     */
    editUser(data) {
      return this.httpClient.post(`${this.API_URL}/users/${data._id}/update`, data);
    }

    /**
     * Sends request to upload data
     * 
     * @param data 
     * Data to upload
     */
    uploadFile(data){
      return this.httpClient.upload(`${this.API_URL}/upload`, data);
    }

    
}
