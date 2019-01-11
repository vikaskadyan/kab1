import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { IsProxyEnableService } from '../services/is-proxy-enable.service';

import { User } from '../model/user.model';
import { HttpResponse } from '@angular/common/http/src/response';
import { Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

import { Router } from '@angular/router';

import { EncryptionService } from '../services/encryption.service'

@Injectable()
export class MapService {

  private loginAPIURL = "http://localhost:8080/getlocation";

  constructor(private http: HttpClient,private cookie:CookieService,private router:Router) { }

  public getUserDetails(userName:string,dateTime:Date) {

    //var _body = JSON.parse(body);
    
    let _headers = new HttpHeaders();
    _headers.append('Content-Type','application/x-www-form-urlencoded' );

    console.log("*"+userName+"*");
    console.log("date is " + dateTime);
   
    var _requestBody = new HttpParams().set('userName',userName).set('date',dateTime.toString());

    return this.http.post<any[]>(this.loginAPIURL,_requestBody,{ headers: _headers, observe: 'response'}).pipe(map( res => {
     // console.log("request body " + JSON.stringify(res));
      return res;
    }));

  }

}
