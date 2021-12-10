import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.page.html',
  styleUrls: ['./my-events.page.scss'],
})
export class MyEventsPage implements OnInit {

  // slideOpts = {
  //   initialSlide: 1,
  //   speed: 400,
  // };
  
  selectedSegment: string = 'Invited';

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(event) {
    this.selectedSegment = event.target.value;
    console.log(event.target.value)
  }

  // segmentChanged() {
  //   this.slider.slideTo(this.segment);
  // }

  // async slideChanged() {
  //   this.segment = await this.slider.getActiveIndex();
  // }

}
