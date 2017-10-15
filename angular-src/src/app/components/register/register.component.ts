import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/user'
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  name: string;
  password: string;
  username: string;

  constructor(private authService: AuthService,
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user: IUser = {
      email: this.email,
      name: this.name,
      password: this.password,
      username: this.username
    };
    // validate fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessagesService.show('Please fill all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    // validate email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessagesService.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    // register user
    this.authService.registerUser(user).subscribe((value) => {
      console.log(value.success);
      const flashOptions = value.success ?
        { cssClass: 'alert-success', timeout: 3000 } :
        { cssClass: 'alert-danger', timeout: 3000 };
      this.flashMessagesService.show(`${value.msg}`, flashOptions);
    });
}
}
