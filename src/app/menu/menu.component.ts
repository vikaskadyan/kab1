import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { LoginService } from '../services/login.service';
import { IsUserLoggedInService } from '../services/is-user-logged-in.service';
import { MenuService } from './menu.service'

import { CookieService } from 'ngx-cookie-service';

import { Router } from '@angular/router';

import {Subject} from 'rxjs/Subject';

import { EncryptionService } from '../services/encryption.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  /**
   * Boolean 
   * 
   * @isMenuVisible to make this show/hide in template
   * it will show menu inside your template
   * 
   */
  @Input() isMenuVisible:boolean = true;

  /**
   * 
   * @isLogoVisible : optional // default value is boolean:true
   * it will show logo inside menu bar
   * 
   */
  @Input() isLogoVisible?:boolean = true;

  /**
   * 
   * @isTotalStatusVisible : required // default is boolean:false 
   * It will show tota status on menu bar
   * 
   * 
   * 
   */
  @Input() isHomeLinksVisible:boolean = false;

  /**
   * 
   * @isSign_in_out_buttonVisible : optional // default is boolean:true
   * It will show login/logout button in menu bar
   * 
   */
  @Input() isSigninoutbuttonVisible?:boolean = true;

  /**
   * @totalStatusData
   * Data to calculate total :-
   *                              request created
   *                              request processed
   *                              request resolved
   */
  @Input() totalStatusData;


  @Output() logout = new EventEmitter();


  totalcreated;
  totalprocessed;
  totalresolved;
  loginButtonValue;

  constructor(private loginService:LoginService,private cookie:CookieService,private isUserLoggedIn:IsUserLoggedInService,
              private router:Router,private menuService:MenuService,private encry:EncryptionService) {
    
   /* this.menuService.loginButtonvalue.subscribe( value => {
      this.loginButtonValue  = value;
    });*/

   }

  ngOnInit() {
    
   }

   /** 
    * It will Logout the current user and delete all the cookies
    * 
    * Will navigate the user to login page
   */
   public logoutButtonClick(event) {
    // this.menuService.emitloginButtonValue("Login");
     //this.singletonService.emittotalstatus(false);
     this.logout.emit(event);
   }

   public isLoginButtonShow() {
     return 
   }


}
