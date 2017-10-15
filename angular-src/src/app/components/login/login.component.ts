import { Component, OnInit } from '@angular/core';
import { ILoginInfo } from '../../interfaces/loginInfo';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password: string;
  username: string;

  constructor(
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const loginInfo: ILoginInfo =  {
      username: this.username.toLowerCase(),
      password: this.password
    }
    this.authService.authenticateLoginInfo(loginInfo).subscribe((value) => {
      if (value.success) {
        this.authService.storeUserData(value.token, value.user)
        this.flashMessagesService.show(`${value.msg}`, { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMessagesService.show(`${value.msg}`, { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

}
