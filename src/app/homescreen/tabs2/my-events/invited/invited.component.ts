/* eslint-disable */
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Invitation } from 'src/app/models/Invitation';
import { RequestParams } from 'src/app/models/RequestParams';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-invited',
  templateUrl: './invited.component.html',
  styleUrls: ['./invited.component.scss'],
})
export class InvitedComponent implements OnInit {

  public invitations: Invitation[]=[];

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
    invitationParams.EndPoint='events/invitations'
    invitationParams.requestType=5;
    invitationParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(invitationParams)
      .subscribe(async (data: Invitation[]) =>{
        await this.setInvitations(data);
        await console.log(this.invitations)
      });
  }

  setInvitations(data: Invitation[]){
    this.invitations=data;
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

  ngOnInit(): void {
    this.fetchInvitations();
  }

}
