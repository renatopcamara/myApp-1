import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import io from 'socket.io-client';
window["io"] = io;

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { CrudPage } from '../pages/crud/crud';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';

import { BackandService } from '@backand/angular2-sdk';

@NgModule({
  declarations: [
    HomePage,
    MyApp,
    LoginPage,
    SignupPage,
    CrudPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [ IonicApp ],
  entryComponents: [
    HomePage,
    MyApp,
    LoginPage,
    SignupPage,
    CrudPage,
    TabsPage
  ],
  providers: [ BackandService ]
})
export class AppModule {}
