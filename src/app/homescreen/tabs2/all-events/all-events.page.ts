import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.page.html',
  styleUrls: ['./all-events.page.scss'],
})
export class AllEventsPage implements OnInit {

  showSearchBar: boolean = false;
  selectedSegment: string = 'Upcoming';

  constructor() { }

  ngOnInit() {
  }

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
  }

  segmentChanged(event) {
    this.selectedSegment = event.target.value;
    console.log(event.target.value)
  }

}
