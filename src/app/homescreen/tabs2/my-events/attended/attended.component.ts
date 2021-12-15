/* eslint-disable */
import { Component, OnInit } from '@angular/core';
import {EventsToAdd} from "../../../../models/Event";
import {ModalController} from "@ionic/angular";
import {DataService} from "../../../../services/data.service";
import {UserService} from "../../../../services/user.service";
import {HttpHeaders} from "@angular/common/http";
import {RequestParams} from "../../../../models/RequestParams";

@Component({
  selector: 'app-attended',
  templateUrl: './attended.component.html',
  styleUrls: ['./attended.component.scss'],
})
export class AttendedComponent implements OnInit {

  public events: EventsToAdd[]=[];

  constructor(public modalController: ModalController,
              private dataService: DataService,
              private userService: UserService) {

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

  getEventDate(data: EventsToAdd){
    const zonedStartDateTimeArr=data.event_start_date.split('[');
    const zonedStartDateTimeString=zonedStartDateTimeArr[0].toString();

    // const zonedEndDateTimeArr=invitation.event_start_date.split('[');
    // const zonedEndDateTimeString=zonedEndDateTimeArr[0].toString();

    return new Date(zonedStartDateTimeString);
  }

  getEventStartTime(data: EventsToAdd){
    const zonedStartDateTimeArr=data.event_start_date.split('[');
    const zonedStartDateTimeString=zonedStartDateTimeArr[0].toString();

    // const zonedEndDateTimeArr=invitation.event_start_date.split('[');
    // const zonedEndDateTimeString=zonedEndDateTimeArr[0].toString();

    return new Date(zonedStartDateTimeString);
  }

  getEventEndTime(data: EventsToAdd){

    const zonedEndDateTimeArr=data.event_end_date.split('[');
    const zonedEndDateTimeString=zonedEndDateTimeArr[0].toString();

    return new Date(zonedEndDateTimeString);
  }

  ngOnInit(): void {
    this.fetchInvitations();
  }

}
