import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class EditShowService {

  constructor(private httpClient: HttpService) { }

  API_URL = 'http://localhost:8000';

  /**
   * Sends request to get show with matching id
   * 
   * @param id 
   * id of show we want to get
   */
  getShowbyId(id) {
    return this.httpClient.get(`${this.API_URL}/shows/${id}`);
  }

  /**
   * Sends a request to add a new show
   * 
   * @param data 
   * data of show we want to add
   */
  addShow(data) {
    return this.httpClient.post(`${this.API_URL}/shows`, data);
  }

  /**
   * Sends a request to remove a show
   * 
   * @param data 
   * data of show we want to remove
   */
  removeShow(data) {
    return this.httpClient.post(`${this.API_URL}/shows/remove`, data);
  }

  /**
   * Updates the data of a show
   * 
   * @param id 
   * id of show we want to edit
   * @param data 
   * the new data of the show we want to override
   */
  editShow(id, data) {
    return this.httpClient.post(`${this.API_URL}/shows/${id}/edit`, data);
  }

  /**
   * Sends request to upload a new file
   * 
   * @param data 
   * data to upload
   */
  uploadFile(data){
    return this.httpClient.upload(`${this.API_URL}/upload`, data);
  }
}
