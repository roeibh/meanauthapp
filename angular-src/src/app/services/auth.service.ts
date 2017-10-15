import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { IUser } from '../interfaces/user';
import * as config from '../config/server';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: IUser;

  constructor(private http: Http) { }

  registerUser(user: IUser) {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${config.server}/users/register`, user, { headers })
    .map(res => res.json());
  }

}
