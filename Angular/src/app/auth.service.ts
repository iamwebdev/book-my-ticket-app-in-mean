import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken;
  loggedInUser;
  headerOptions;
  headers;
  readonly baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  createAuthHeaders() {
    this.loadToken();
    this.headerOptions = new HttpHeaders({
        'Content-Type' : 'application/json',
        'authorization': this.authToken
    })
    this.headers = {
      headers : this.headerOptions
    }
  }

  loadToken() {
    this.authToken = localStorage.getItem('token') || [];
  }
  // Register User
  saveUser(formValues) {
    return this.http.post(this.baseUrl+'register',formValues)
  }

  //Login 
  loginAttempt(formValues) {
    return this.http.post(this.baseUrl+'login', formValues);
  }

  //Logout
  logout() {
    this.authToken = null;
    this.loggedInUser = null;
    localStorage.clear();
  }

  //Save Logged in User Credentails
  saveLoggedInUser(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.loggedInUser = user;
  }

  getProfile() {
    this.createAuthHeaders();
    return this.http.get(this.baseUrl+'my-profile', this.headers);
  }

  getWatchedHistory() {
    this.createAuthHeaders();
    return this.http.get(this.baseUrl+'watched-movies', this.headers)
  }
}
