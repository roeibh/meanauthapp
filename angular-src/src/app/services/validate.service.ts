import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';
@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user: IUser) {
    return user.email && user.name && user.password && user.username;
  }

  validateEmail(email: string) {
    // tslint:disable-next-line:max-line-length
    const regexp: RegExp = new RegExp('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$');
    return regexp.test(email);
  }
}
