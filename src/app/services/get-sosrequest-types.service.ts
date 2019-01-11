import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { User } from '../model/user.model';
import { HttpResponse } from '@angular/common/http/src/response';
import { Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';

import { RequestStatus } from '../model/requeststatus';

@Injectable()
export class GetSosrequestTypesService {

  private ProxySOSDataURL = "./assets/json/requeststatus.json";

  constructor(private http: HttpClient) { }

  public getSOSRequestTypes() {
    console.log("getSOSRequestTypes  ");

  return this.http.get(this.ProxySOSDataURL).pipe(map( res => {
      console.log("response  " + JSON.stringify(res));
      return res;
    })).catch((e: any) => Observable.throw(this.errorHandler(e)));

  }

  errorHandler(error: any): void {
    console.log(error)
  }

}
