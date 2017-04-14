import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { BackandService } from '@backand/angular2-sdk'

import { TabsPage } from '../pages/tabs/tabs';
import { CrudPage } from '../pages/crud/crud';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
// @Component({
//   template: `<h1>Hello World!</h1>`
// })
export class MyApp {
  rootPage;
  username:string = '';
  password:string = '';
  auth_type:string = "N/A";
  is_auth_error:boolean = false;
  auth_status:string = null;
  loggedInUser: string = '';

  constructor(platform: Platform, private backand:BackandService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      backand.init({
        appName: 'proj01',
        signUpToken: 'd28a16f6-ecbc-46f1-a7be-efbdc45f1e30',
        anonymousToken: 'c406c73c-3688-4828-a734-004ac04b04d0',
        runSocket: true,
        mobilePlatform: 'ionic'
      });
      this.backand.user.getUserDetails().then(
        (res: any) => {
          if(res.data) {
            this.loggedInUser = res.data.username;
            this.auth_status = 'OK';
            this.auth_type = res.data.token_type == 'Anonymous' ? 'Anonymous' : 'Token';
          }
        },
        (err: any) => {
          this.loggedInUser = null;
          this.auth_status = null;
          this.auth_type = null;
        }
      );
      if(this.auth_status == 'OK'){
        this.rootPage = CrudPage;
        console.log('crud page' + this.auth_status);
      }
      else{
      this.rootPage = TabsPage;
      console.log('tabs page' + this.auth_status);

      }
    });
  }
}
