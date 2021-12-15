/* eslint-disable */
import { Component, OnInit } from '@angular/core';
import {EventsToAdd} from "../../../models/Event";
import {ModalController} from "@ionic/angular";
import {DataService} from "../../../services/data.service";
import {UserService} from "../../../services/user.service";
import {HttpHeaders} from "@angular/common/http";
import {RequestParams} from "../../../models/RequestParams";

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  public events: EventsToAdd[]=[];

  constructor(public modalController: ModalController,
              private dataService: DataService,
              private userService: UserService) {

  }

  ngOnInit(): void {
    this.fetchInvitations();
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

  fetchInvitations(){
    const invitationParams=new RequestParams();
    invitationParams.EndPoint='events/attended';
    invitationParams.requestType=5;
    invitationParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(invitationParams)
      .subscribe(async (data: EventsToAdd[]) =>{
        await this.setInvitations(data);
        await console.log(this.events);
      });
  }

  setInvitations(data: EventsToAdd[]){
    this.events=data;
  }

  getEventsCount(data: EventsToAdd[]){
    return data.length
  }

  getTotalSeminarHour(data: EventsToAdd[]){
    let seminarHours = 0;
    for(let event of data){
      seminarHours+=event.seminar_hours;
    }

    return seminarHours;
  }

}
