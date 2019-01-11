import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MenuService {

  //public totalprocessed = new Subject<boolean>();;
  //public totalcreated = new Subject<boolean>();;
  //public totalresolved = new Subject<boolean>();;

  constructor(private cookie:CookieService) { }

  /*public getTotalStatus() {
    var isTotalstatusCal:boolean  = this.cookie.check("isTotalStatusCalculated");

    if(isTotalstatusCal == true) {
      this.emitTotalCreated(this.cookie.get("totalcreated"));
      this.emitTotalProcessed(this.cookie.get("totalprocessed"));
      this.emitTotalResolved(this.cookie.get("totalresolved"));
    }
    else {

    }
  }


  /*public emitTotalCreated(value) {
    this.totalcreated.next(value);
  }


  public emitTotalProcessed(value) {
    this.totalprocessed.next(value);
  }

  public emitTotalResolved(value) {
    this.totalresolved.next(value);
  }*/

}
