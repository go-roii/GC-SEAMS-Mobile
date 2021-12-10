/* eslint-disable */
import {Component, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ScanQrModalPage } from '../scan-qr-modal/scan-qr-modal.page';
import {HttpHeaders} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {DataService} from "../../services/data.service";
import {RequestParams} from "../../models/RequestParams";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  events: Event[]=[];

  constructor(public modalController: ModalController,
              private userService: UserService,
              private dataService: DataService) {}

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

  fetchPendingEvents(){
    const pendingEventsParams=new RequestParams();
    pendingEventsParams.EndPoint='/events/upcoming'
    pendingEventsParams.requestType=5;
    pendingEventsParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(pendingEventsParams)
      .subscribe(async (data: Event[]) =>{
        await this.setEvents(data);
        await console.log(this.events)
      });
  }

  setEvents(data: Event[]){
    this.events=data;
  }

  ngOnInit(): void {
    this.fetchPendingEvents();
  }

}
