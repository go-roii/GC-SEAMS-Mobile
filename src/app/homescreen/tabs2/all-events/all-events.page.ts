import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.page.html',
  styleUrls: ['./all-events.page.scss'],
})
export class AllEventsPage implements OnInit {

  selectedSegment: string = 'Upcoming';

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(event) {
    this.selectedSegment = event.target.value;
    console.log(event.target.value)
  }

}
