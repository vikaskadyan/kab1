import { Injectable } from '@angular/core';

import {Subject} from 'rxjs/Subject';
import { SosdataModel } from '../model/sosdata-model';

@Injectable()
export class SingletonutilityService {

  totalcreated = new Subject<boolean>();
  totalprocessed = new Subject<boolean>();
  totalresolved = new Subject<boolean>();
  loginlogout = new Subject<number>();

  _testSOSData = new Subject<SosdataModel[]>();

  _sosUsersData = new Subject<SosdataModel[]>();

  constructor() { 
    this.emitLoginLogoutButton("Login");
  }

  public emitLoginLogoutButton(value) {
    this.loginlogout.next(value);
  }

  public emittotalprocessed(value) {
    this.totalprocessed.next(value);
  }

  public emittotalcreated(value) {
    this.totalcreated.next(value);
  }

  public emittotalresolved(value) {
    this.totalresolved.next(value);
  }


  public setTestSOSData(value) {
    this._testSOSData.next(value);
  }

  public getTestSOSData() {
    return this._testSOSData.asObservable();
  }


  public setSOSUsersData(value) {
    this._sosUsersData.next(value);
  }

  public getSOSUsersData() {
    return this._sosUsersData.asObservable();
  }

}
