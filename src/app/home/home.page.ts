import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public auth: AuthService,
    private router: Router,
    //private loadingCtrl: LoadingController,
    //private alertCtrl: AlertController
  ) { }

  async logout(){
    await this.auth.logout();
    this.router.navigateByUrl("/",{replaceUrl: true});
  }

}
