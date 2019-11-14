import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  API_URL = 'http://localhost:8000';

  constructor(private httpClient: HttpService) { }

  /**
   * Gets show with id
   * 
   * @param id 
   * id of show
   */
  getShow(id) {
    return this.httpClient.get(`${this.API_URL}/shows/${id}`);
  }

  /**
   * Gets average rating of show
   * 
   * @param id 
   * id of show
   */
  getShowAvg(id) {
    return this.httpClient.get(`${this.API_URL}/rating/avg/${id}`);
  }
  
  /**
   * Gets status of show
   * 
   * @param id 
   * id of show
   */
  getShowStatus(id) {
    return this.httpClient.get(`${this.API_URL}/rating/status/${id}`);
  }

  /**
   * Gets reviews of show
   * 
   * @param id 
   * id of show
   */
  getShowReviews(id) {
    return this.httpClient.get(`${this.API_URL}/rating/review/${id}`);
  }

  /**
   * Gets a user's rating of a show
   * @param user_id 
   * user's id
   * @param show_id 
   * id of show
   */
  getMyRating(user_id, show_id){
    return this.httpClient.get(`${this.API_URL}/rating/user/${user_id}/${show_id}`);
  }

  /**
   * Request to add a new rating to a show
   * 
   * @param data 
   * request body
   */
  addRating(data) {
    return this.httpClient.post(`${this.API_URL}/rating`, data);
  }

  /**
   * Checks if show is in user's list
   * 
   * @param user_id 
   * user's id
   * @param show_id 
   * show's id
   */
  isMyShow(user_id, show_id) {
    return this.httpClient.get(`${this.API_URL}/users/${user_id}/show/${show_id}`);
  }

  /**
   * Adds show to user's list
   * 
   * @param id 
   * user's id
   * @param data 
   * request body
   */
  userAddShow(id, data) {
    return this.httpClient.post(`${this.API_URL}/users/${id}/addshow`, data);
  }

  /**
   * Removes show from user's list
   * 
   * @param id 
   * user's id
   * @param data 
   * request body
   */
  userRemoveShow(id, data) {
    return this.httpClient.post(`${this.API_URL}/users/${id}/removeshow`, data);
  }

  /**
   * Gets current user
   */
  getSessionUser(){
    return this.httpClient.get(`${this.API_URL}/getsessionuser`);
  }
}
