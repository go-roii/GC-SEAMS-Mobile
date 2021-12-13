/* eslint-disable */
import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {UserService} from "../../../../services/user.service";
import {DataService} from "../../../../services/data.service";
import {HttpHeaders} from "@angular/common/http";
import {RequestParams} from "../../../../models/RequestParams";
import {EventsToAdd} from "../../../../models/Event";

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss'],
})
export class UpcomingComponent implements OnInit {

  events: EventsToAdd[]=[];

  constructor(public modalController: ModalController,
              private userService: UserService,
              private dataService: DataService) {}

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

  fetchPendingEvents(){
    const eventsParams=new RequestParams();
    eventsParams.EndPoint='/events/upcoming'
    eventsParams.requestType=5;
    eventsParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(eventsParams)
      .subscribe(async (data: EventsToAdd[]) =>{
        await this.setEvents(data);
        await console.log(this.events)
      });
  }

  setEvents(data: EventsToAdd[]){
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
    this.fetchPendingEvents();
  }

}
