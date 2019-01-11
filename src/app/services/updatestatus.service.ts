import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { User } from '../model/user.model';
import { HttpResponse } from '@angular/common/http/src/response';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';

import { CookieService } from 'ngx-cookie-service';

import { IsProxyEnableService } from '../services/is-proxy-enable.service';
import { GetUtilityService } from '../services/get-utility.service'

import { EncryptionService } from '../services/encryption.service';
import { Subscriber } from 'rxjs';

@Injectable()
export class UpdatestatusService {

  private SOSDataURL = "https://kabapi.azurewebsites.net/api/Emergency/ChangeStatus";

  constructor(private http: HttpClient, private isProxy: IsProxyEnableService, private cookie: CookieService,
    private getutilityservice: GetUtilityService, private encryption: EncryptionService) { }



  public updateStatus(id:any,status:string) {

    let _isproxy = decodeURIComponent(this.cookie.get(this.encryption.encryptstring('isproxy'))).toString();

    console.log("12345678!!!!  " + _isproxy);

    let _isproxy_decrypt = this.encryption.decryptstring(_isproxy);

    //let _isproxy = sessionStorage.getItem('isproxy');
    console.log("isproxy is   " + _isproxy + "     " + _isproxy_decrypt);

    if(_isproxy_decrypt == "true") {

      console.log("sos proxy enabled shruti **************   ");

      return new Observable<string>((subscriber: Subscriber<string>) => subscriber.next('proxy'));
    }

    else {

      console.log("non proxy sos   " + this.isProxy.getIsProxyEnable());

      //{'Authorization': this.cookie.get(this.encryption.encryptstring("kabUseroAuthToken"))}
      var _headers = new HttpHeaders({'Authorization': this.encryption.decryptstring(this.cookie.get(this.encryption.encryptstring("kabUseroAuthToken")))});

      let _token = this.cookie.get(this.encryption.encryptstring("kabUseroAuthToken"));
      console.log("oauth token is  " + _token.replace(" ",">"));
  
      _headers.append('Authorization',this.encryption.decryptstring(this.cookie.get(this.encryption.encryptstring("kabUseroAuthToken"))));
      _headers.append('Content-Type', 'application/x-www-form-urlencoded');
     
      var _requestBody = new HttpParams().set('Id',id).set('Status',status);
  
  
      return this.http.post(this.SOSDataURL,_requestBody,{ headers: _headers, observe: 'response'}).pipe(map( res => {
        console.log("response  " + JSON.stringify(res));
       // this.getutilityservice.setStatusOfTotalRequest(res.body);
        return res.body;
      })).catch((e: any) => Observable.throw(this.errorHandler(e)));

    }

  }

 private errorHandler(error: any): void {
    console.log(error)
  }

}
