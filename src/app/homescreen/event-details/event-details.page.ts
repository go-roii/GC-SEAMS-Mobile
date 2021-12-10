/* eslint-disable */
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Invitation} from "../../models/Invitation";
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../services/data.service";
import {UserService} from "../../services/user.service";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {RequestParams} from "../../models/RequestParams";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit, AfterViewInit {

  private activeEventUUID: Subscription;
  uuid!: string;
  public event: Invitation;

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private userService: UserService) {
  }

  ngAfterViewInit(): void {
    this.addViewCount(this.uuid);
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
        await console.log(data);
      });
  }

  submitRegistration(uuid: string){

    const body = {
      event_uuid: uuid
    }

    const registrationParams=new RequestParams();
    registrationParams.EndPoint='events/register';
    registrationParams.requestType=4;
    registrationParams.body=body;
    registrationParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(registrationParams)
      .subscribe(async (data: string) => {
        await console.log(data);
        await alert("Registration submitted");
      }, (er: HttpErrorResponse) => {
        this.dataService.handleError(er);
      });

  }

  addViewCount(uuid: string){

    console.log('viewed uuid: '+uuid);
    const body = {
      event_uuid: uuid
    }

    const viewParams=new RequestParams();
    viewParams.EndPoint='analytics/views';
    viewParams.requestType=4;
    viewParams.body=body;
    viewParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(viewParams)
      .subscribe(async (data: string) => {
        await console.log(data);
        await alert("view count submitted");
      }, (er: HttpErrorResponse) => {
        this.dataService.handleError(er);
      });
  }

  getEventDate(invitation: Invitation){
    try{
      const zonedStartDateTimeArr=invitation.event_start_date.split('[');
      const zonedStartDateTimeString=zonedStartDateTimeArr[0].toString();
      return new Date(zonedStartDateTimeString);
    }catch (e){

    }
  }

  getEventStartTime(invitation: Invitation){

    try{
      const zonedStartDateTimeArr=invitation.event_start_date.split('[');
      const zonedStartDateTimeString=zonedStartDateTimeArr[0].toString();

      return new Date(zonedStartDateTimeString);
    }catch (e){

    }

  }

  getEventEndTime(invitation: Invitation){

    try{

      const zonedEndDateTimeArr=invitation.event_end_date.split('[');
      const zonedEndDateTimeString=zonedEndDateTimeArr[0].toString();

      return new Date(zonedEndDateTimeString);

    }catch (e) {

    }

  }

  setActiveEvent(data: Invitation){
    this.event=data;
  }
}
