import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SosdataModel } from '../model/sosdata-model';


//Cookie Service
import { CookieService } from 'ngx-cookie-service';

//Encryption Service
import { EncryptionService } from '../services/encryption.service'

@Component({
  selector: 'app-totalstatus',
  templateUrl: './totalstatus.component.html',
  styleUrls: ['./totalstatus.component.css']
})
export class TotalstatusComponent implements OnInit,OnChanges {

  /**
   * isTotalStatusVisible , it will display Total Request status on your page 
   * 
   * Options :- boolean /true/false
   */
  @Input() isTotalStatusVisible:boolean = false;

  /**
   * 
   * User Data to calculate total request created,processed,resolved and total no of request
   * 
   */
  @Input() SOSUserData?:SosdataModel[];


  _totalnoofrequest = 0;
  _totalrequestcreated = 0;
  _totalrequestprocessed = 0;
  _totalrequestresolved = 0;

  _totalnoofrequest_cookie = 0;
  _totalrequestcreated_cookie = 0;
  _totalrequestprocessed_cookie = 0;
  _totalrequestresolved_cookie = 0;



  constructor(private cookie:CookieService,private encrypt:EncryptionService) {

    //console.log("sos user data is " + this.SOSUserData);
    

   }

  ngOnInit() {

    this._totalnoofrequest_cookie = this.encrypt.decryptstring(this.cookie.get(this.encrypt.encryptstring("totalnoofrequest")));

    this._totalrequestcreated_cookie = this.encrypt.decryptstring(this.cookie.get(this.encrypt.encryptstring("created")));

    this._totalrequestprocessed_cookie = this.encrypt.decryptstring(this.cookie.get(this.encrypt.encryptstring("pending")));

    this._totalrequestresolved_cookie = this.encrypt.decryptstring(this.cookie.get(this.encrypt.encryptstring("resolved")));
   
  }

  ngOnChanges(changes: SimpleChanges) {
    
    console.log("********************************************************************");
    for(let propName in changes) {
      if(propName == 'SOSUserData') {
        console.log("on change is    ********      " + JSON.stringify(this.SOSUserData));
        let sosUserData = this.SOSUserData;

        for(let userData of sosUserData) {
          if(userData.RequestStatus === 'CREATED') {
            this._totalrequestcreated++;
            this._totalnoofrequest++;
            console.log("CREATED");
          }
          if(userData.RequestStatus === 'Pending') {
            this._totalrequestprocessed++;
            this._totalnoofrequest++;
            console.log("Pending");
          }
          if(userData.RequestStatus === 'RESOLVED') {
            this._totalrequestresolved++;
            this._totalnoofrequest++;
            console.log("RESOLVED");
          }
        }

        this._totalnoofrequest_cookie = this._totalnoofrequest;
        this._totalrequestcreated_cookie = this._totalrequestcreated;
        this._totalrequestprocessed_cookie = this._totalrequestprocessed;
        this._totalrequestresolved_cookie =  this._totalrequestresolved;
        
       // console.log("SOSuserData is changed " + this._totalrequestcreated + " ******    " + this._totalnoofrequest);
        this.cookie.set(this.encrypt.encryptstring("created"),this.encrypt.encryptstring(JSON.stringify(this._totalrequestcreated)));
        this.cookie.set(this.encrypt.encryptstring("pending"),this.encrypt.encryptstring(JSON.stringify(this._totalrequestprocessed)));
        this.cookie.set(this.encrypt.encryptstring("resolved"),this.encrypt.encryptstring(JSON.stringify(this._totalrequestresolved)));
        this.cookie.set(this.encrypt.encryptstring("totalnoofrequest"),this.encrypt.encryptstring(JSON.stringify(this._totalnoofrequest)));
      }
    }
   // console.log("total request created " + this.cookie.get(this.encrypt.encryptstring("created")));
   // console.log("********************************************************************");
    this._totalnoofrequest = 0;
    this._totalrequestcreated = 0;
    this._totalrequestprocessed = 0;
    this._totalrequestresolved = 0;
  }

}
