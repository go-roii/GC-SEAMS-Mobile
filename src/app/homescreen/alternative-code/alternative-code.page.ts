/* eslint-disable */
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {RequestParams} from "../../models/RequestParams";
import {DataService} from "../../services/data.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-alternative-code',
  templateUrl: './alternative-code.page.html',
  styleUrls: ['./alternative-code.page.scss'],
})
export class AlternativeCodePage implements OnInit {

  attendance_code!: string;

  constructor(private dataService: DataService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {

  }

  attendanceForm = new FormGroup({
    attendance_code: new FormControl('', [Validators.required, Validators.email]),
  });

  get attendanceCode(){return this.attendanceForm.controls['attendance_code'].value; }

  getHttpOptions(){
    const trimmedHeader=this.userService.getAuthHeader().split(':');
    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: trimmedHeader[1]
      })
    };
    return httpOptions;
  }

  passAttendance(){

    const body = {
      attendance_code: this.attendanceCode
    }

    const attendanceParams=new RequestParams();
    attendanceParams.EndPoint='event/attendance';
    attendanceParams.requestType=4;
    attendanceParams.body=body;
    attendanceParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(attendanceParams)
      .subscribe(async (data: string) => {
        await console.log(data);
        await this.dataService.presentSuccessAlert('Attendance Submitted');
        await this.router.navigateByUrl('my-events');
      }, (er: HttpErrorResponse) => {
        this.dataService.handleError(er);
        this.router.navigateByUrl('my-events');
      });
  }

}
