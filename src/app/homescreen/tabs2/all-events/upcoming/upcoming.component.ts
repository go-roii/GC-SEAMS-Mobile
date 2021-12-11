/* eslint-disable */
import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {UserService} from "../../../../services/user.service";
import {DataService} from "../../../../services/data.service";
import {HttpHeaders} from "@angular/common/http";
import {RequestParams} from "../../../../models/RequestParams";

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss'],
})
export class UpcomingComponent implements OnInit {

  events: Event[]=[];

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

  fetchUpcomingEvents(){
    const eventsParams=new RequestParams();
    eventsParams.EndPoint='/events/upcoming'
    eventsParams.requestType=5;
    eventsParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(eventsParams)
      .subscribe(async (data: Event[]) =>{
        await this.setEvents(data);
        await console.log(this.events)
      });
  }

  setEvents(data: Event[]){
    this.events=data;
  }

  ngOnInit(): void {
    this.fetchUpcomingEvents();
  }

}
