import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class ShowFormService {

  API_URL = 'http://localhost:8000';

  constructor(private httpClient: HttpService) { }

  /**
   * Request to add new show
   * 
   * @param data
   * request body
   */
  addShow(data) {
    return this.httpClient.post(`${this.API_URL}/shows`, data);
  }

  /**
   * Request to upload data to server
   * 
   * @param data 
   * data to upload
   */
  uploadFile(data){
    return this.httpClient.upload(`${this.API_URL}/upload`, data);
  }
}
