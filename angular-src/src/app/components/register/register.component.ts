import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/user'
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

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

  constructor(
    private authService: AuthService,
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user: IUser = {
      email: this.email.toLowerCase(),
      name: this.name,
      password: this.password,
      username: this.username.toLowerCase()
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
      if (value.success) {
        this.flashMessagesService.show(`${value.msg}`, { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show(`${value.msg}`, { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }
}
