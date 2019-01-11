import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { User } from '../model/user.model';
import { HttpResponse } from '@angular/common/http/src/response';
import { Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';

import { CookieService } from 'ngx-cookie-service';

import { IsProxyEnableService } from '../services/is-proxy-enable.service';
import { GetUtilityService } from '../services/get-utility.service'

import { EncryptionService } from '../services/encryption.service';
import { SingletonutilityService } from '../singletonservices/singletonutility.service';


@Injectable()
export class GetSosdataService implements OnInit {

  private SOSDataURL = "https://kabapi.azurewebsites.net/api/Emergency/HospitalByRequest";
  private ProxySOSDataURL = "./assets/json/sos.json";

  body = "HospitalId=0&RequestType=SOS"; 

  constructor(private http: HttpClient,private isProxy:IsProxyEnableService,private cookie:CookieService,
              private getutilityservice:GetUtilityService,private encryption:EncryptionService,private getsingleton:SingletonutilityService) { 

  }

  ngOnInit(): void {
   
  }


  public getSOSData():any {

    let _isproxy = decodeURIComponent(this.cookie.get(this.encryption.encryptstring('isproxy'))).toString();

    console.log("12345678!!!!  " + _isproxy);

    let _isproxy_decrypt = this.encryption.decryptstring(_isproxy);

   //let _isproxy = sessionStorage.getItem('isproxy');
    console.log("isproxy is   " + _isproxy + "     " + _isproxy_decrypt);
    
    if(_isproxy_decrypt == "true") {
      console.log("sos proxy enabled");
      return this.getProxySOSData();
    }
    else {

      console.log("non proxy sos   " + this.isProxy.getIsProxyEnable());

      //{'Authorization': this.cookie.get(this.encryption.encryptstring("kabUseroAuthToken"))}
      var _headers = new HttpHeaders({'Authorization': this.encryption.decryptstring(this.cookie.get(this.encryption.encryptstring("kabUseroAuthToken")))});

      let _token = this.cookie.get(this.encryption.encryptstring("kabUseroAuthToken"));
      console.log("oauth token is  " + _token.replace(" ",">"));
  
      _headers.append('Authorization',this.encryption.decryptstring(this.cookie.get(this.encryption.encryptstring("kabUseroAuthToken"))));
      _headers.append('Content-Type', 'application/x-www-form-urlencoded');
     
      var _requestBody = new HttpParams().set('HospitalId','0').set('RequestType','SOS');
  
  
      return this.http.post(this.SOSDataURL,_requestBody,{ headers: _headers, observe: 'response'}).pipe(map( res => {
        //console.log("response  " + JSON.stringify(res));
        
        this.getutilityservice.setStatusOfTotalRequest(res.body);
        return res.body;
      })).catch((e: any) => Observable.throw(this.errorHandler(e)));

    }

  }

  public getProxySOSData() {

    console.log("sos proxy method");

    return this.http.get(this.ProxySOSDataURL).pipe(map( res => {
      console.log("response  " + res);
      this.getutilityservice.setStatusOfTotalRequest(res);
      return res;
    })).catch((e: any) => Observable.throw(this.errorHandler(e)));

  }

  errorHandler(error: any): void {
    console.log(error)
  }

}
