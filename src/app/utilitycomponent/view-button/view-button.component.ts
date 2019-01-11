import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdateButtonComponent } from '../update-button/update-button.component';

@Component({
  selector: 'app-view-button',
  templateUrl: './view-button.component.html',
  styleUrls: ['./view-button.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ViewButtonComponent implements OnInit {

  userLat: number;
  userLong: Number;
  userData;
  soslong;
  soslat;
  firstname;
  lastname;
  address;
  mobile;
  status;

  direction;

  directionoptions = {
    suppressMarkers: true,
    draggable: false,
    travelMode: 'DRIVING',

  };


  constructor(@Inject(MAT_DIALOG_DATA) public data: string, public dialogRef: MatDialogRef<ViewButtonComponent>,
    private matdialog: MatDialog) {
    this.userData = data;
    this.firstname = this.userData.firstName;
    this.lastname = this.userData.lastName;
    this.address = this.userData.address;
    this.mobile = this.userData.mobile;
    this.status = this.userData.status;
    //console.log("user id is " + this.userData.id);
    //console.log("user status is " + this.userData.sosuserstatus);
    this.userLat = <number>JSON.parse(this.userData.lat);
    this.userLong = <number>JSON.parse(this.userData.long);
    //this.soslat = <number> JSON.parse(this.userData.soslocationlat);
    //this.soslong = <Float64Array> JSON.parse(this.userData.soslocationlong);

    this.soslat = 28.5591041;
    this.soslong = 77.2607094;

    console.log("user lat is " + this.userLat);
    console.log("user long is " + this.userLong);

    this.direction = {
      origin: {
        lat: this.userLat,
        lng: this.userLong,
      },
      destination: {
        lat: this.soslat,
        lng: this.soslong
      }


    }

  }

  ngOnInit() {

  }

  example() {
    alert("View Button clicked");
  }

  openUpdateModal(event) {

    let userLocation = {
      id: this.userData.id,
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      mobile: this.userData.mobile,
      address: this.userData.address,
      currentStatus: this.userData.status
    }

    console.log("update button clicked to open Update Modal");
    this.dialogRef.close();
    this.matdialog.open(UpdateButtonComponent, {
      disableClose: false,
      autoFocus: true,
      height: '100%',
      data: userLocation
    });

  }

}
