import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GetSosrequestTypesService } from '../../services/get-sosrequest-types.service';
import { RequestStatus , RStatus} from '../../model/requeststatus';
import { UpdatestatusService } from '../../services/updatestatus.service';
import { GetSosdataService } from '../../services/get-sosdata.service';
import { SosUserModel } from '../../model/sosuser-model';
import { SingletonutilityService } from '../../singletonservices/singletonutility.service';
import { LoginFailedComponent } from '../../login-failed/login-failed.component';

@Component({
  selector: 'app-update-button',
  templateUrl: './update-button.component.html',
  styleUrls: ['./update-button.component.css'],
  encapsulation : ViewEncapsulation.Emulated
})
export class UpdateButtonComponent implements OnInit {

  _requeststatus:RStatus[] ;
  currentstatus;
  userData;
  firstname;
  lastname;
  address;
  mobile;
  status;

  constructor(@Inject(MAT_DIALOG_DATA) public data:string,public dialogRef: MatDialogRef<UpdateButtonComponent>,private getSOSRequestTypesService:GetSosrequestTypesService,
              private updateSOSStatus:UpdatestatusService,private getSOSUserData:GetSosdataService,
              private getSingleton:SingletonutilityService,private matdialog: MatDialog) {
    
    this.userData = data;
    this.firstname = this.userData.firstName;
    this.lastname = this.userData.lastName;
    this.address = this.userData.address;
    this.mobile = this.userData.mobile;
    this.currentstatus = this.userData.currentStatus;

    this.getSOSRequestTypesService.getSOSRequestTypes().subscribe(res => { 
      let _dataArray = <RequestStatus> JSON.parse(JSON.stringify(res))
      
      this._requeststatus = _dataArray.RequestStatusData;
    });

    

   }

  ngOnInit() {

    this.getSOSRequestTypesService.getSOSRequestTypes().subscribe(res => { 
      let _dataArray = <RequestStatus> JSON.parse(JSON.stringify(res))
      
      this._requeststatus = _dataArray.RequestStatusData;
     // this._status = this._requeststatus[0].requestStatus;
      //console.log("request status is   init " + this._status[2].requestStatus);

    });

  }

  example() {
    alert("Update Button clicked");
  }

  public updateStatusButton(event) {

    console.log("********  user data is " + JSON.stringify(this.userData));
    console.log("Id is " + this.userData.id + "            Status is " + event);
    this.updateSOSStatus.updateStatus(this.userData.id,event).subscribe(res => {
      //console.log("response of update ******   "  + JSON.stringify(res));

      if(res === 'proxy') {
        this.dialogRef.close();

        let data = {
          headerValue: 'Update Status Confirmation',
          bodyValue: 'You are using Proxy User , this service is not available for Proxy Users.Please try with Real Users'
        }

        this.matdialog.open(LoginFailedComponent, {
          data : data,
          height:'100%'
        });
      }
      else {

        this.dialogRef.close();
        this.getSOSUserData.getSOSData().subscribe( res => {

          let _dataArray = <SosUserModel> JSON.parse(JSON.stringify(res));
      
          //this.sosUserDetails = _dataArray.Data;
    
          //console.log("response from get sos data ******  " + JSON.stringify(res.Data));
          this.getSingleton.setSOSUsersData(_dataArray);
      
         });

         let data = {
          headerValue: 'Update Status Confirmation',
          bodyValue: 'User Request Status is Updated Successfuly. Old Status : ' + this.userData.currentStatus + '     New Status : ' + event
        }

         this.matdialog.open(LoginFailedComponent, {
           data:data,
           height:'100%'
         })
      }

     
       
    });

    
    //this.getSingleton.setTestSOSData(event);
    
   // window.location.reload();
    /*this.getSOSUserData.getSOSData().subscribe( res => {

      let _dataArray = <SosUserModel> JSON.parse(JSON.stringify(res));
  
      sosUserDetails = _dataArray.Data;
  
      console.log("***&&&&&&&   user data is    " + this.sosUserDetails);
     });*/
  }
}
