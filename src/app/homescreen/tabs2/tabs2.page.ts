/* eslint-disable */
import { Component, OnInit } from '@angular/core';
import {RequestParams} from "../../models/RequestParams";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {SpeakersService} from "../../services/speakers.service";
import {DepartmentService} from "../../services/departments.service";
import {DataService} from "../../services/data.service";
import {HttpHeaders} from "@angular/common/http";
import {Departments} from "../../models/Departments";
import {Speaker} from "../../models/Speaker";
import {UserProfile} from "../../models/UserProfile";



@Component({
  selector: 'app-tabs2',
  templateUrl: './tabs2.page.html',
  styleUrls: ['./tabs2.page.scss'],
})
export class Tabs2Page implements OnInit {

  fullName!: string;
  email!: string;


  // currentPage: string = this.router.url;
  currentPage: string = '';

  constructor(private router : Router,
              private userService: UserService,
              private departmentService: DepartmentService,
              private speakersService: SpeakersService,
              private dataService: DataService
  ) {
  }

  ngOnInit(): void {

    this.fetchProfile();


    //department service will be loaded if not yet
    if(!this.departmentService.isLoaded){
      this.fetchDepartments()
      this.departmentService.isLoaded=true;
    }

    //speakers service will be loaded in not yet
    if(!this.speakersService.IsLoaded){
      this.fetchSpeakers();
    }

    //refresh timer will be started if not yet
    if(!this.userService.getTimerIsStarted()){
      this.userService.getRefreshToken();
      this.userService.start();
    }


    const firstName: string = this.userService.getActiveUser().first_name;
    const lastName: string = this.userService.getActiveUser().last_name;
    this.fullName=firstName+" "+lastName;
    this.email=this.userService.getActiveUser().email_address;

    // this.router.navigate(['homescreen/events/ongoing'])
    // this.router.events.subscribe(event => {
    // 	if (event instanceof NavigationStart) {
    // 		this.routerChangeMethod(event.url);
    // 	}
    // })

    console.log("refresh token: "+this.userService.getRefreshToken().refresh_token);
    console.log("access token: "+this.userService.getAuthHeader())
    console.log(this.userService.getLoginState());
    console.log(this.userService.getActiveUser())
  }

  // routerChangeMethod(url: string) {
  // 	this.currentPage = url;
  // }



  logout(){
    this.userService.logOut();
    console.log(this.userService.getLoginState());
  }

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


  public fetchDepartments(){
    const departmentParams= new RequestParams();
    departmentParams.EndPoint="departments";
    departmentParams.RequestType=1;

    this.dataService.httprequest(departmentParams)
      .subscribe((data: Departments[]) => this.departmentService.setDepartments(data));
  }

  public fetchSpeakers(){
    const speakerParams= new RequestParams();
    speakerParams.EndPoint="speakers";
    speakerParams.RequestType=5;
    speakerParams.AuthToken=this.getHttpOptions();

    this.dataService.httprequest(speakerParams)
      .subscribe((data: Speaker[]) => this.speakersService.setSpeakers(data));
  }

  fetchProfile(){
    const speakerParams= new RequestParams();
    speakerParams.EndPoint="profile";
    speakerParams.RequestType=5;
    speakerParams.AuthToken=this.getHttpOptions();

    this.dataService.httprequest(speakerParams)
      .subscribe((data: UserProfile) => this.userService.setActiveUser(data));
  }


}
