/* eslint-disable */
import {Component, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ScanQrModalPage } from '../scan-qr-modal/scan-qr-modal.page';
import {Invitation} from "../../models/Invitation";
import {DataService} from "../../services/data.service";
import {UserService} from "../../services/user.service";
import {HttpHeaders} from "@angular/common/http";
import {RequestParams} from "../../models/RequestParams";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  public invitations: Invitation[]=[];

  constructor(public modalController: ModalController, private dataService: DataService, private userService: UserService) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: ScanQrModalPage,
      cssClass: 'my-custom-class'
    });

    return await modal.present();
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
