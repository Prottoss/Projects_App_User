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

  cars:[] = [];

  constructor(private alertCtrl: AlertController, private userService: UserService) {}

  ngOnInit() {
    this.userService.getVehiclesFromUser().valueChanges().subscribe((res:any) => {
      this.cars = res;
      console.log("cars",this.cars);
    });  
  }

  async addVehicle(){
    const alert = await this.alertCtrl.create({
      header: 'Add Vehicle',
      inputs: [
        {
          name: 'reg',
          placeholder: 'Reg Number',
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

  async deleteVehicle(reg:string){
    this.userService.deleteVehicleFromUser(reg);
    console.log(reg);
  }

}
