import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminUserListService {

    API_URL = 'http://localhost:8000';

    constructor(private httpClient: HttpService) { }

    /**
     * Request to get list of users
     */
    fetchUsers() {
        return this.httpClient.get(`${this.API_URL}/users`)
    }

    /**
     * Request to check if admin
     */
    isAdmin() {
        return this.httpClient.get(`${this.API_URL}/sessioncheckeradmin`)
    }

    /**
     * Sends request to change a user's banned/admin status
     * 
     * @param user 
     * User we want to change status of
     */
    updateUser(user) {
        return this.httpClient.post(`${this.API_URL}/users/${user._id}/update/type`, user);
    }
}
