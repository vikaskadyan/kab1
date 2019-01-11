import { Component, OnInit, Input } from '@angular/core';

import { MapService } from './map.service';
import { GetUtilityService } from '../services/get-utility.service';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/timer'
import 'rxjs/add/observable/from'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/scan'
import 'rxjs/add/operator/map'

import { } from '@types/googlemaps';

import {CalendarModule} from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  @Input() sosUserDetails = [];

  sosLocation = [];
  markers = [];
  testLocation = [];
  sos;
  totaldistance: number | 2 = 0;
  speed:number = 0;

  maplatitude = 28.7041;
  maplongitude = 77.1025;
  zoomlevel = 5;

  previousLocation;
  nextLocation;
  count = 0;
  startActivityButtonVisible = false;
  date;
  displayNoDateSelect = false;

  iconUrlCar = {
    url: 'assets/images/caricon.png'
  }

  students: Array<any> = [
    {
      name: "Alan"
    },
    {
      name: "Jake"
    },
    {
      name: "Harry"
    },
    {
      name: "Susan"
    },
    {
      name: "Sarah"
    },
    {
      name: "Esther"
    }
  ];


  constructor(private map: MapService, private getUtil: GetUtilityService) {
    
  }

  ngOnInit() {
  }

  public getFloat(value) {
    return this.getUtil.getFloat(value);
  }

  public getMarkerURL() {
    return this.iconUrlCar;
  }


  public startactivity(event) {
    this.startActivityButtonVisible = true;
    this.sosUserDetails = [];
    this.totaldistance = 0;

    if(this.date != null) {

      this.map.getUserDetails("test",this.date).subscribe(res => {
        this.sosLocation = res.body;
  
        var observable = Observable.interval(200).take(this.sosLocation.length).map(t => this.sosLocation[t]);
  
        observable.subscribe(t1 => {
  
          this.markers.splice(0, 1);
          this.sosUserDetails.push(t1);
          this.markers.push(t1);
  
          if (this.count == 0) {
            this.nextLocation = t1;
          }
          else {
            this.previousLocation = this.nextLocation;
            this.nextLocation = t1;
            var distance = this.calculateDistance(this.previousLocation.latitude, this.nextLocation.latitude, this.previousLocation.longitude, this.nextLocation.longitude);
            
            this.totaldistance = parseFloat((this.totaldistance + distance).toFixed(2));
  
            //console.log("distance from calculate methos is " + distance + "  total distance is " + this.totaldistance);
            //const speed = this.calculateSpeed(distanceTravell, (new Date(this.nextLocation.date - this.previousLocation.date)));
            var startTime = new Date(this.previousLocation.date);
            var endtime = new Date(this.nextLocation.date);
  
            var duration = endtime.getTime() - startTime.getTime();
  
            this.speed = this.calculateSpeed(distance,duration);
  
            //console.log("duration is " + this.speed);
          }
  
          this.count++;
  
        });
        this.maplatitude = this.sosLocation[0].latitude;
        this.maplongitude = this.sosLocation[0].longitude;
        this.zoomlevel = 19;
      });



    } else {
      this.displayNoDateSelect = true;
    }

    this.startActivityButtonVisible = false;
  }

  public calculateDistance(latitude1, latitude2, longitude1, longitude2):number {
    //console.log("latitude1 " + latitude1 + "  latitude2 " + latitude2 + "   longitude1 " + longitude1 + "  longitude2 " + longitude2);
    const startPoint = new google.maps.LatLng(latitude1, longitude1);
    const endPoint = new google.maps.LatLng(latitude2, longitude2);
    const distance: number = google.maps.geometry.spherical.computeDistanceBetween(startPoint, endPoint);
    //this.totaldistance = (this.totaldistance + distance);
    return this.convertIntoKM(distance);
  }

  public calculateSpeed(distance, time):number {
    var timeTaken = (time/1000 /60 /60);
    return parseInt((distance/timeTaken).toFixed(0));
  }

  public convertIntoKM(meter):number {
    let km: number | 2 = meter / 1000;
    //console.log("km is before parse " + km);
    //console.log("km is after parse " + parseFloat(km.toFixed(2)));
    return parseFloat(km.toFixed(2));  //| number : 2
  }

  public checkButtonStatus() {
    return this.startActivityButtonVisible;
  }

}
