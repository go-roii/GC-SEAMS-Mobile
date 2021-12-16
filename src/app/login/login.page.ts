/* eslint-disable */
import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '../models/Credentials';
import { RequestParams } from '../models/RequestParams';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
import {UserProfile} from "../models/UserProfile";
import {DepartmentService} from "../services/departments.service";
import {SpeakersService} from "../services/speakers.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginComponent implements OnInit {
  private headers!: string[];

  constructor(private userService: UserService,
              public dataService: DataService,
  ) {
  }

  ngOnInit(): void {
  }

  credentialsForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  //getters for the fields' validation
  get email() {
    return this.credentialsForm.get('email');
  }

  get password() {
    return this.credentialsForm.get('password');
  }

  public login(): void {

    const credentials: Credentials = {
      email_address: this.credentialsForm.controls['email'].value,
      password: this.credentialsForm.controls['password'].value
    }

    const loginParams = new RequestParams();
    loginParams.EndPoint = "login";
    loginParams.Body = credentials;
    loginParams.RequestType = 3;

    this.dataService.getConfigResponse(loginParams.EndPoint, loginParams.body)
      // resp is of type `HttpResponse<RefreshTokens>`
      .subscribe(resp => {
          // display its headers
          const keys = resp.headers.keys();

          //store headers to headers[] property
          this.headers = keys.map(key =>
            `${key}: ${resp.headers.get(key)}`);

          // access the body directly, which is typed as `RefreshTokens`.
          this.userService.setRefreshToken({...resp.body!});

          //set auth header on user service equals to the first index in headers array property
          this.userService.setAuthHeader(this.headers[0]);

          //trim the header to remove the "authorization:" at the beginning
          const trim = this.userService.getAuthHeader().split(':');
          console.log("trimmed header: " + trim[1])

          this.userService.start();
          this.userService.setLoginState();
        },
        er => {
          this.dataService.handleError(er)
        });
  }
}
