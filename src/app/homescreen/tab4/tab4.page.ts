import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ScanQrModalPage } from '../scan-qr-modal/scan-qr-modal.page';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  constructor(public modalController: ModalController) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: ScanQrModalPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
