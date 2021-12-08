/* eslint-disable */
import {AfterViewInit, Component, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-scan-qr-modal',
  templateUrl: './scan-qr-modal.page.html',
  styleUrls: ['./scan-qr-modal.page.scss'],
})
export class ScanQrModalPage implements OnInit{

  constructor(public modalController: ModalController,
              private qrScanner: QRScanner) { }

  ngOnInit() {

    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted

          this.qrScanner.show().then(r => {
            //this.scanningOnProgress=true;

            const scanSub = this.qrScanner.scan().subscribe((text: string) => {
              alert('Scanned something :' + text);

              this.qrScanner.hide(); // hide camera preview
              scanSub.unsubscribe(); // stop scanning
              //this.scanningOnProgress=false;
            });


          });

        } else if (status.denied) {
          this.qrScanner.openSettings();
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => alert('Error: ' + e));

  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
