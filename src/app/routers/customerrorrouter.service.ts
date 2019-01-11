import { Injectable } from '@angular/core';
import {ExtraOptions} from "@angular/router";
import {ErrorHandler} from "@angular/router/src/router";

@Injectable()
export class CustomerrorrouterService implements ExtraOptions{

  public errorHandler: ErrorHandler; // Overwrites attribute in ExtraOptions!

  constructor() { 
    this.errorHandler = error => {
    console.error('routing error: ', error);
    }
  }

}
