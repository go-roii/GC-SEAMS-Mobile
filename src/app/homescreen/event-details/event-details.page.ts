/* eslint-disable */
import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Invitation} from "../../models/Invitation";
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../services/data.service";
import {UserService} from "../../services/user.service";
import {HttpHeaders} from "@angular/common/http";
import {RequestParams} from "../../models/RequestParams";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  private activeEventUUID: Subscription;
  uuid!: string;
  public event: Invitation;

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.activeEventUUID = this.route.params.subscribe(params => {
      this.uuid = params['uuid'];
    });
    console.log(this.uuid);

    this.getEventDetails(this.uuid);
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

  getEventDetails(uuid: string){
    const eventDetailsParams=new RequestParams();
    eventDetailsParams.EndPoint='event/'+uuid;
    eventDetailsParams.requestType=5;
    eventDetailsParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(eventDetailsParams)
      .subscribe(async (data: Invitation) =>{
        await this.setActiveEvent(data);
        await console.log(data)
      });
  }

  getEventDate(invitation: Invitation){
    const zonedStartDateTimeArr=invitation.event_start_date.split('[');
    const zonedStartDateTimeString=zonedStartDateTimeArr[0].toString();

    // const zonedEndDateTimeArr=invitation.event_start_date.split('[');
    // const zonedEndDateTimeString=zonedEndDateTimeArr[0].toString();

    return new Date(zonedStartDateTimeString);
  }

  getEventStartTime(invitation: Invitation){
    const zonedStartDateTimeArr=invitation.event_start_date.split('[');
    const zonedStartDateTimeString=zonedStartDateTimeArr[0].toString();

    // const zonedEndDateTimeArr=invitation.event_start_date.split('[');
    // const zonedEndDateTimeString=zonedEndDateTimeArr[0].toString();

    return new Date(zonedStartDateTimeString);
  }

  getEventEndTime(invitation: Invitation){

    const zonedEndDateTimeArr=invitation.event_end_date.split('[');
    const zonedEndDateTimeString=zonedEndDateTimeArr[0].toString();

    return new Date(zonedEndDateTimeString);
  }

  setActiveEvent(data: Invitation){
    this.event=data;
  }
}
