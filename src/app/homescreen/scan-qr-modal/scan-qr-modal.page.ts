/* eslint-disable */
import {AfterViewInit, Component, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import {RequestParams} from "../../models/RequestParams";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {DataService} from "../../services/data.service";


@Component({
  selector: 'app-scan-qr-modal',
  templateUrl: './scan-qr-modal.page.html',
  styleUrls: ['./scan-qr-modal.page.scss'],
})
export class ScanQrModalPage implements OnInit{

  constructor(public modalController: ModalController,
              private qrScanner: QRScanner,
              private userService: UserService,
              private dataService: DataService) { }

  ngOnInit() {

    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted

          this.qrScanner.show().then(r => {
            //this.scanningOnProgress=true;

            const scanSub = this.qrScanner.scan().subscribe((text: string) => {
              //alert('Scanned something :' + text);

              const qrDetail = JSON.parse(text);
              this.passAttendance(qrDetail);
              alert('Attendance Submitted.');

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
          alert('Permission denied')
        }
      })
      .catch((e: any) => alert('Error: ' + e));

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

  passAttendance(body: any){

    const attendanceParams=new RequestParams();
    attendanceParams.EndPoint='event/attendance';
    attendanceParams.requestType=4;
    attendanceParams.body=body;
    attendanceParams.authToken=this.getHttpOptions();

    this.dataService.httprequest(attendanceParams)
      .subscribe(async (data: string) => {
        await console.log(data);
        await alert("You have successfully submitted your attendance.");
      }, (er: HttpErrorResponse) => {
        this.dataService.handleError(er);
      });
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
