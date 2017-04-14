import { Component } from '@angular/core';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { CrudPage } from '../crud/crud';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = LoginPage;
  tab3Root: any = SignupPage;
  tab4Root: any = CrudPage;

  constructor() {}
}
