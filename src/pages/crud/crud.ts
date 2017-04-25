import {Component} from '@angular/core';
import { BackandService } from '@backand/angular2-sdk'
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'crud.html',
  selector: 'page-crud'
})

export class CrudPage {

  public email: string = '';
  description: string = 'abastecimento';
  quantidade: number;
  consumo: number;
  odometro: number;
  datareg: String = new Date().toLocaleString();

  get score() {
    let consumo = this.odometro / this.quantidade;
    return consumo;
  }

  public items:any[] = [];
  searchQuery: string;

  username:string = '';
  password:string = '';
  auth_type:string = "N/A";
  is_auth_error:boolean = false;
  auth_status:string = null;
  loggedInUser: string = '';

  constructor(
    private backand: BackandService,
    public alertCtrl: AlertController)
  {
    this.searchQuery = '';
    let that = this;
    this.backand.on("items_updated",
      (res: any) => {
        let a = res.data as any[];
        let newItem = {};
        a.forEach((kv)=> newItem[kv.Key] = kv.Value);
        that.items.unshift(newItem);
      }
    );
    this.backand.user.getUserDetails().then(
      (res: any) => {
        if(res.data) {
          this.loggedInUser = res.data.username;
          this.email = res.data.username;
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

  mostraAlerta() {
    let alert = this.alertCtrl.create({
       title: ' ' + this.odometro / this.quantidade,
       buttons: [
         {
           text: 'Corrigir',
           role: 'cancel',
           handler: () => {
             this.getItems();
             console.log(this.items);
           }
         },
         {
           text: 'OK',
           handler: () => {
             console.log('registro salvo');
             this.postItem();
           }
         }
       ]
     });
     alert.present();
    }

  public postItem() {
    let mileage = this.odometro / this.quantidade;

    let item = {
      email: this.loggedInUser,
      description: this.description,
      quantidade: this.quantidade,
      odometro: this.odometro,
      consumo: mileage,
      datareg: new Date().toLocaleString()
    };

    if (item.email && item.description)
    {
      this.backand.object.create('todo', item)
      .then((res: any) => {
        // add to beginning of array
        // this.items.unshift({ id: null, name: this.name, description: this.description, idlogin: this.loggedInUser });
        // this.name = '';
        // this.description = '';
      },
      (err: any) => {
        alert(err.data);
      });
      }
  }

  public getItems() {
   this.backand.object.getList('todo')
    .then((res: any) => {
      this.items = res.data;
    },
    (err: any) => {
      alert(err.data);
    });
  }

  public filterItems() {
    // set q to the value of the searchbar
    var q = this.searchQuery;

    // if the value is an empty string don't filter the items
    if (!q || q.trim() == '') {
      return;
    }
    else{
        q = q.trim();
    }


    let params = {
      filter: [
        this.backand.helpers.filter.create('name', this.backand.helpers.filter.operators.text.contains, q),
      ],
    }

    this.backand.object.getList('todo', params)
    .then((res: any) => {
      this.items = res.data;
    },
    (err: any) => {
      alert(err.data);
    });
  }

}
