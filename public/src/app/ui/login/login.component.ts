import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MyShow } from '../models/my_show';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  // user object to bind to from
  user: any = {};

  // list of all users
  dummyUsers: Array<User> = [];

  //boolean for login errors
  error: boolean = false;
  errorMsg: string;

  // boolean for log banned user trying to login
  is_banned: boolean = false;

  constructor(public router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.getUsers();
    if(sessionStorage.getItem('currentUser') != null) {
      this.router.navigate(['/grid'])
    }
  }

  /**
   * gets all users in the session storage
   */
  getUsers() {
    this.dummyUsers = JSON.parse(sessionStorage.getItem('users'));
  }

  /**
   * checks login credentials based on the given user credentials bound to
   * the user object and validates them, against the dummy users to
   * see if the user existing and is not banned.
   */
  loginUser() {
    this.loginService.loginUser(this.user).subscribe((response)=>{
            this.error = false;
            sessionStorage.setItem('currentUser', JSON.stringify(response));
            this.router.navigate(['/grid']);
        }, error => {
            // console.log(error)
            // console.log(error.error)
            this.error = true
            this.errorMsg = error.error
        }
    );
  }

}
