import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { LoginPage } from '../login/login';
import { BackandService } from '@backand/angular2-sdk'
/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  username:string = '';
  password:string = '';
  auth_type:string = "N/A";
  is_auth_error:boolean = false;
  auth_status:string = "NO";
  loggedInUser: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private backand: BackandService)
    {this.backand.user.getUserDetails().then(
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }


}
