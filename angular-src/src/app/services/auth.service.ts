import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { IUser } from '../interfaces/user';
import { ILoginInfo } from '../interfaces/loginInfo';
import * as config from '../config/server';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: string;
  user: IUser;

  constructor(private http: Http) { }

  registerUser(user: IUser) {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${config.server}/users/register`, user, { headers })
    .map(res => res.json());
  }

  authenticateLoginInfo(loginInfo: ILoginInfo) {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${config.server}/users/authenticate`, loginInfo, { headers })
    .map(res => res.json());
  }

  getProfile() {
    const headers: Headers = new Headers();
    this.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    return this.http.get(`${config.server}/users/profile`, { headers })
    .map(res => res.json());
  }

  storeUserData(token: string, user: IUser) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    try {
      this.authToken = localStorage.getItem('token');
    } catch (error) {
      this.authToken = null;
    }
  }

  isLoggedIn() {
    return tokenNotExpired();
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
