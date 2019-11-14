import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  constructor(private httpClient: HttpService) { }

  API_URL = 'http://localhost:8000';

  /**
   *  User related API calls
   */

  /**
   * Sends a request to add a show to a user's shows
   * 
   * @param id 
   * id of user
   * @param data 
   * request body
   */
  userAddShow(id, data) {
    return this.httpClient.post(`${this.API_URL}/users/${id}/addshow`, data);
  }

  /**
   * Sends a request to remove a show from a user's shows
   * 
   * @param id 
   * id of user
   * @param data 
   * request body
   */
  userRemoveShow(id, data) {
    return this.httpClient.post(`${this.API_URL}/users/${id}/removeshow`, data);
  }

  /**
   * Gets a user's shows from server
   * 
   * @param id 
   * id of user 
   */
  getMyShows(id) {
    return this.httpClient.get(`${this.API_URL}/users/${id}/myshows`);
  }

  /**
   * Gets shows that aren't in user's list
   * 
   * @param id 
   * id of user
   */
  getNotMyShows(id) {
    return this.httpClient.get(`${this.API_URL}/users/${id}/notmyshows`);
  }


  /**
   *  Show related API calls
   */

  /**
   * Gets approved shows from server
   */
  getApprovedShows() {
    return this.httpClient.get(`${this.API_URL}/shows/approved`);
  }

  /**
   * Gets unapproved shows from server
   */
  getUnapprovedShows() {
    return this.httpClient.get(`${this.API_URL}/shows/unapproved`);
  }

  /**
   * Request to add now show
   * 
   * @param data 
   * request body
   */
  addShow(data) {
    return this.httpClient.post(`${this.API_URL}/shows`, data);
  }

  /**
   * Request to edit show information
   * 
   * @param id 
   * id of show to edit
   * @param data 
   * request body
   */
  editShow(id, data) {
    return this.httpClient.post(`${this.API_URL}/shows/${id}/edit`, data);
  }

  /**
   * Request to remove show
   * 
   * @param data 
   * request body
   */
  removeShow(data) {
    return this.httpClient.post(`${this.API_URL}/shows/remove`, data);
  }

  /**
   * Request to approve show
   * 
   * @param data 
   * request body
   */
  approveShow(data) {
    return this.httpClient.post(`${this.API_URL}/shows/approve`, data);
  }

  /**
   * Request to update show
   * 
   * @param data 
   * request body
   */
  approveAndDeleteShow(data) {
    return this.httpClient.post(`${this.API_URL}/shows/approveAndDelete`, data);
  }

  /**
   * Get current user
   */
  getSessionUser(){
    return this.httpClient.get(`${this.API_URL}/getsessionuser`);
  }
}
