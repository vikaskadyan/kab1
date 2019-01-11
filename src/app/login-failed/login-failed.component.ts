import { Component, OnInit,ViewEncapsulation, Inject,Input } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-login-failed',
  templateUrl: './login-failed.component.html',
  styleUrls: ['./login-failed.component.css'],
  encapsulation : ViewEncapsulation.Emulated
})
export class LoginFailedComponent implements OnInit {

  @Input() headerValue;
  @Input() bodyValue;

  constructor(@Inject(MAT_DIALOG_DATA) public data) { 
    this.headerValue = data.headerValue;
    this.bodyValue = data.bodyValue;
  }

  ngOnInit() {
  }

}
