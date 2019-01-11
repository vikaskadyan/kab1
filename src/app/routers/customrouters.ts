import { ModuleWithProviders }  from '@angular/core';

//Routing Components
import {Routes, RouterModule} from "@angular/router";


//Custom Components
import { LoginComponent } from '../login/login.component';
import { PolicecontrolroomComponent } from '../policecontrolroom/policecontrolroom.component';
import { TestComponent } from '../test/test.component';
import { EncryptionComponent } from '../encryption/encryption.component';
import { TotalstatusComponent } from '../totalstatus/totalstatus.component'


//Gaurd Components
import { UserLoginGuard } from '../guard/user-login.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'policecontrolroom', component: PolicecontrolroomComponent ,canActivate : [UserLoginGuard]},
    { path: 'test' , component : TestComponent},
    { path: 'encryption', component : EncryptionComponent}
   ];

  // export const routing: ModuleWithProviders = RouterModule.forRoot(routes,{useHash: true});