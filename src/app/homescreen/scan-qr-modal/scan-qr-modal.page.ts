/* eslint-disable */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-scan-qr-modal',
  templateUrl: './scan-qr-modal.page.html',
  styleUrls: ['./scan-qr-modal.page.scss'],
})
export class ScanQrModalPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
