import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

/* Wraps the HttpClient object to add the current users authorization token
   saved in the browsers sessionStorage under the key 'token', to any supported
   http requests (GET, POST) */
export class HttpService {

  constructor(private http: HttpClient) { }

  // returns an HttpHeaders object with the current user's auth token
  addAuthToken(header: HttpHeaders) {
    return header;
  }

  // performs a get request after calling the addAuthToken function
  get(url) {
    let header = new HttpHeaders();
    header = this.addAuthToken(header);
    return this.http.get(url, { headers: header, withCredentials: true });
  }

  // performs a post request after calling the addAuthToken function
  post(url, data) {
    let header = new HttpHeaders();
    header = this.addAuthToken(header);
    return this.http.post(url, data, { headers: header, withCredentials: true });
  }

  // performs a post request after calling the addAuthToken function
  upload(url, data) {
    return this.http.post(url, data);
  }


}
