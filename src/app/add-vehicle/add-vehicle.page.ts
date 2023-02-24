import { Component, Injectable, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';

@Injectable({
  providedIn: "root"
})

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.page.html',
  styleUrls: ['./add-vehicle.page.scss'],
})

export class AddVehiclePage implements OnInit {

  cars =[];

  constructor(private alertCtrl: AlertController, private userService: UserService) { }

  ngOnInit() {
  }

  async addVehicle(){
    const alert = await this.alertCtrl.create({
      header: 'Add ',
      inputs: [
        {
          name: 'reg',
          placeholder: 'enter car reg',
          type: 'textarea'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Add',
          handler: res => {
            this.userService.addVehicleToUser(res.reg);
          }
        }
      ]
    });
    
    await alert.present();
  }

  openCars(car:any){

  }

}
