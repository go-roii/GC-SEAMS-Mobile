import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import { RequestParams } from '../models/RequestParams';
import {Observable, throwError} from 'rxjs';
import {RefreshTokens} from '../models/RefreshTokens';
import {retry} from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})

export class DataService {

  public baseURL = 'https://seams-backend.herokuapp.com/api/v1/';

  constructor(private http: HttpClient, public alertController: AlertController) {}

  getConfigResponse(endpoint: string, body: Credential): Observable<HttpResponse<RefreshTokens>> {

    return this.http.post<RefreshTokens>(
      this.baseURL+'/'+endpoint, body, { observe: 'response' })
      .pipe(
        retry(3), // retry a failed request up to 3 times
      );
  }

  getNewAccessToken(endpoint: string, body: RefreshTokens): Observable<HttpResponse<RefreshTokens>> {
    return this.http.post<RefreshTokens>(this.baseURL+'/'+endpoint, body, { observe: 'response' })
      .pipe(
        retry(3), // retry a failed request up to 3 times
      );
  }

  httprequest(requestParams: RequestParams){

    let result: any;
    switch(requestParams.RequestType){

      //get data without authentication header
      case 1:
        result = this.http.get(this.baseURL+requestParams.EndPoint);
        break;

      //post data without authentication header;
      case 2:
        result = this.http.post(this.baseURL+requestParams.EndPoint, requestParams.Body);
        break;

      //post data and get the access token from the header and the refresh token from the body.
      case 3:
        result=this.getConfigResponse(requestParams.endPoint, requestParams.body);
        break;

      //post data with authentication header
      case 4:
        result = this.http.post(this.baseURL+requestParams.EndPoint, requestParams.Body, requestParams.AuthToken);
        break;

      //get data with authentication header
      case 5:
        result = this.http.get(this.baseURL+requestParams.EndPoint, requestParams.AuthToken);
        break;
      default:
        break;
    }

    return result;
  }

  async presentSuccessAlert(msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success!',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error!',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 404){
      this.presentAlert(error.error.message);
    }else if(error.status === 401){
      this.presentAlert(error.error.message);
    }else if(error.status === 400){
      this.presentAlert(error.error.message);
    }else if(error.status === 403){
      this.presentAlert(error.error.message);
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}


