import { Component, OnInit, ViewEncapsulation,ViewChildren,QueryList,Output,EventEmitter, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GetSosdataService } from '../services/get-sosdata.service';
import { SosdataModel } from '../model/sosdata-model';
import { SosUserModel } from '../model/sosuser-model';
import { UpdateButtonComponent } from '../utilitycomponent/update-button/update-button.component';
import { ViewButtonComponent } from '../utilitycomponent/view-button/view-button.component';
import { GetUtilityService } from '../services/get-utility.service';
import { AgmMarker,LatLngLiteral,AgmInfoWindow,InfoWindowManager} from '@agm/core';
import { AgmSnazzyInfoWindow,AgmSnazzyInfoWindowModule} from '@agm/snazzy-info-window';


import { MatDialog , MatProgressBarModule} from '@angular/material';

import { Router } from '@angular/router';
import { SingletonutilityService } from '../singletonservices/singletonutility.service';

@Component({
  selector: 'app-policecontrolroom',
  templateUrl: './policecontrolroom.component.html',
  styleUrls: ['./policecontrolroom.component.css'],
  providers: [GetSosdataService],
  encapsulation : ViewEncapsulation.None
})
export class PolicecontrolroomComponent implements OnInit {

  @Output() updateButton = new EventEmitter();

  animal: string;
  name: string;

  location = {};
  latitude = 28.710071;
  longitude = 77.2607063;

  isOpen = true;
  isSnazzyInfoWindowOpened:boolean = true;

  @Input() sosUserDetails:SosdataModel[];

  @Input() testSOSdata:string;

  iconUrlRED = {
    url: 'assets/images/red-dot.png',
    scaledSize: {
      height: 40,
      width: 40
    }
  }

    iconUrlGREEN = {
      url: 'assets/images/green-dot.png',
      scaledSize: {
        height: 40,
        width: 40
      }
    }
      iconUrlYELLOW = {
        url: 'assets/images/yellow-dot.png',
        scaledSize: {
          height: 40,
          width: 40
        }
      }

  settings = {
    rowClassFunction: (row) => {
      if (row.cells[3].newValue === 'CREATED') {
          return 'text-danger';
      } 
      if(row.cells[3].newValue === 'Pending') {
        return 'text-warning';
      }
      if(row.cells[3].newValue === 'RESOLVED') {
          return 'text-success';
      }
    },
    actions: {
      edit:false,
      delete:false,
      title:'',
      add:false,
      position:'right',
      custom : [
        {
          name:'view',
          title:'<b>View | </b>',
          clicked:'openb()'
        },
        {
          name:'update',
          title:'<b>Update</b>'
        }
      ],
    },
    pager : {
      display : true,
      perPage:9
      },
    columns: {
      FirstName : {
        title: 'First Name',
        
      },
      Mobile: {
        title: 'Mobile'
      },
      RequestMessage: {
        title: 'SOS Type',
        filter : false
      },
      RequestStatus: {
        title: 'Status'
      }/*,
      Id: {
        title: 'ID',
        class:'hidecolumn',
        filter:false
      }
      /*,
      button: {
        title: '',
        type: 'custom',
        renderComponent: ViewButtonComponent,
        defaultValue: 'HI Again!!!!!',
        filter : false,

      }/*,
      button1: {
        title: '',
        type: 'custom',
        renderComponent: UpdateButtonComponent,
        defaultValue: 'HI Again!!!!!',
        filter : false
      }*/
    }
  };


  constructor(private cookie:CookieService,private getSOSUserData:GetSosdataService,
              private getUtil:GetUtilityService,private matdialog:MatDialog,
              private router:Router,private singletonUtility:SingletonutilityService) {

    
    
    this.getSOSUserData.getSOSData().subscribe( res => {

      let _dataArray = <SosUserModel> JSON.parse(JSON.stringify(res));
  
      this.sosUserDetails = _dataArray.Data;
  
      console.log("***&&&&&&&   user data is    " + this.sosUserDetails);
     });

     this.singletonUtility.getTestSOSData().subscribe(data => {
       this.testSOSdata = JSON.stringify(data);
     });

     this.singletonUtility.getSOSUsersData().subscribe(data => {
       let _dataArray = <SosUserModel> JSON.parse(JSON.stringify(data));
       this.sosUserDetails = _dataArray.Data;
     });

   }

  ngOnInit() {

    

   /* this.getSOSUserData.getSOSData().subscribe( res => {

    let _dataArray = <SosUserModel> JSON.parse(JSON.stringify(res));

    this.sosUserDetails = _dataArray.Data;

   }); */


    if(navigator.geolocation){
      
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        console.log("sos  " + this.latitude);
        console.log("sos lon  " + this.longitude);
      });
   }

   

  }

  public getFloat(value) {
    return this.getUtil.getFloat(value);
  }

  public viewclicked(event) {

    let buttonName = event.action;


    if(buttonName == 'view') {

      let userLocation = {
        lat: event.data.Lat,
        long:event.data.Long,
        sosuserstatus:event.data.RequestStatus,
        requesttype:event.data.RequestType,
        id:event.data.Id,
        soslocationlat:this.latitude,
        soslocationlang:this.longitude,
        firstName:event.data.FirstName,
        lastName:event.data.LastName,
        address:event.data.Address,
        mobile:event.data.Mobile,
        status:event.data.RequestStatus
      }

      this.matdialog.open(ViewButtonComponent,{
        data:userLocation,
        width:'100%',
        height:'100%',
        maxWidth:'90%'
      });

    }


    else if(buttonName == 'update') {
      let userLocation = {
        firstName: event.data.FirstName,
        lastName:event.data.LastName,
        mobile:event.data.FirstName,
        address:event.data.Address,
        currentStatus:event.data.RequestStatus,
        id:event.data.Id
      }
      this.matdialog.open(UpdateButtonComponent, {
        data: userLocation,
        height:'100%'
       });
    }
  }

  public getMarkerURL(sosuserdetail) {
    if(sosuserdetail.RequestStatus == 'CREATED') {
      return this.iconUrlRED;
    }
    else if(sosuserdetail.RequestStatus == 'Pending') {
      return this.iconUrlYELLOW;
    }
    else if(sosuserdetail.RequestStatus == 'RESOLVED'){
      return this.iconUrlGREEN;
    }
  }
  

  public logoutUser(event) {
    console.log("button emmiter event is  " + event);
     console.log("logout button clicked");
     this.cookie.deleteAll();
     this.router.navigateByUrl('');
  }

}
