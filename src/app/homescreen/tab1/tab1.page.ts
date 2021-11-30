import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ScanQrModalPage } from '../scan-qr-modal/scan-qr-modal.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public modalController: ModalController) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: ScanQrModalPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
